const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

// Initialize Firebase Admin SDK
admin.initializeApp();

const bucket = admin.storage().bucket();
const app = express();

// Check if running in emulator
const isEmulated = process.env.FUNCTIONS_EMULATOR === 'true';

// Use CORS middleware to allow requests from your web app
app.use(cors({ origin: true }));

// The base path for all storage operations
const basePath = 'imagePersonalWebsite/';

// --- CENTRALIZED URL GENERATION FUNCTION ---
async function getUrlsForFiles(folderPath) {
    console.log(`--- DEBUG: getUrlsForFiles called for folder: [${folderPath}] ---`);
    try {
        const [files] = await bucket.getFiles({ prefix: folderPath });

        if (!files || files.length === 0) {
            console.log(`--- DEBUG: No files found in [${folderPath}].`);
            return [];
        }

        const urlPromises = files.map(async (file) => {
            if (file.name.endsWith('/')) {
                return null;
            }

            if (isEmulated) {
                const emulatorHost = process.env.FIREBASE_STORAGE_EMULATOR_HOST || '127.0.0.1:9199';
                const publicUrl = `http://${emulatorHost}/${bucket.name}/${file.name}`;
                console.log(`--- DEBUG: Generated emulator URL: ${publicUrl}`);
                return publicUrl;
            } else {
                const [url] = await file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                });
                return url;
            }
        });

        const urls = await Promise.all(urlPromises);
        const validUrls = urls.filter(url => url !== null);
        console.log(`--- DEBUG: Returning ${validUrls.length} URLs.`);
        return validUrls;
    } catch (error) {
        console.error(`Error getting URLs for ${folderPath}:`, error);
        throw new Error('Error getting URLs');
    }
}

// API endpoint to get a single profile image
app.get('/get-image-profile', async (req, res) => {
    try {
        const files = await getUrlsForFiles(`${basePath}image-profile/`);
        res.json({ file: files[0] || null });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API endpoint to get the latest images for the home page
app.get('/get-latest-images', async (req, res) => {
    try {
        const files = await getUrlsForFiles(`${basePath}Home/`);
        res.json({ files });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API endpoint to get the list of gallery albums
app.get('/get-gallery-albums', async (req, res) => {
    try {
        const [folders] = await bucket.getFiles({ prefix: `${basePath}Gallery/`, delimiter: '/' });

        if (!folders.prefixes) {
            return res.json({ albums: [] });
        }

        const albumPromises = folders.prefixes.map(async (folder) => {
            const folderName = folder.name.split('/').slice(-2, -1)[0];
            const [files] = await bucket.getFiles({ prefix: folder.name, limit: 1 });

            let firstImage = null;
            if (files.length > 0 && !files[0].name.endsWith('/')) {
                if (isEmulated) {
                    const emulatorHost = process.env.FIREBASE_STORAGE_EMULATOR_HOST || '127.0.0.1:9199';
                    firstImage = `http://${emulatorHost}/${bucket.name}/${files[0].name}`;
                } else {
                    const [url] = await files[0].getSignedUrl({
                        action: 'read',
                        expires: '03-09-2491'
                    });
                    firstImage = url;
                }
            }

            return {
                folderNameReal: folder.name,
                folderName: folderName,
                firstImage: firstImage
            };
        });

        const albums = await Promise.all(albumPromises);
        res.json({ albums });
    } catch (error) {
        console.error('Error fetching albums:', error);
        res.status(500).send(error.message);
    }
});

// API endpoint to get all images for a specific gallery album
app.get('/get-images-album', async (req, res) => {
    const albumPath = req.query.album;
    if (!albumPath) {
        return res.status(400).send('Album path is required');
    }
    try {
        const files = await getUrlsForFiles(albumPath);
        res.json({ files });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app);
