const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

// Initialize Firebase Admin SDK
admin.initializeApp();

const bucket = admin.storage().bucket();
const app = express();

// Use CORS middleware to allow requests from your web app
app.use(cors({ origin: true }));

// The base path for all storage operations
const basePath = 'imagePersonalWebsite/';

// Function to get signed URLs for files in a folder
async function getSignedUrls(folderPath) {
    console.log(`--- DEBUG: getSignedUrls called for folder: [${folderPath}] ---`);
    try {
        const [files] = await bucket.getFiles({ prefix: folderPath });

        if (!files || files.length === 0) {
            console.log(`--- DEBUG: No files found in [${folderPath}].`);
            return [];
        }

        console.log(`--- DEBUG: Found ${files.length} item(s) in [${folderPath}].`);
        files.forEach(file => console.log(`--- DEBUG: Item: ${file.name}`));

        const signedUrls = await Promise.all(files.map(async (file) => {
            // Skip subfolders
            if (file.name.endsWith('/')) {
                console.log(`--- DEBUG: Skipping folder: ${file.name}`);
                return null;
            }
            console.log(`--- DEBUG: Signing URL for: ${file.name}`);
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491' // A far-future expiration date
            });
            return url;
        }));
        
        const validUrls = signedUrls.filter(url => url !== null);
        console.log(`--- DEBUG: Returning ${validUrls.length} signed URLs.`);
        return validUrls;
    } catch (error) {
        console.error(`Error getting signed URLs for ${folderPath}:`, error);
        throw new Error('Error getting signed URLs');
    }
}

// API endpoint to get a single profile image
app.get('/api/get-image-profile', async (req, res) => {
    try {
        // Prepend the base path to the target folder
        const files = await getSignedUrls(`${basePath}image-profile/`);
        res.json({ file: files[0] || null });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API endpoint to get the latest images for the home page
app.get('/api/get-latest-images', async (req, res) => {
    try {
        // Prepend the base path to the target folder
        const files = await getSignedUrls(`${basePath}Home/`);
        res.json({ files });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API endpoint to get the list of gallery albums
app.get('/api/get-gallery-albums', async (req, res) => {
    try {
        // Prepend the base path to the gallery folder
        const [folders] = await bucket.getFiles({ prefix: `${basePath}Gallery/`, delimiter: '/' });
        
        if (!folders.prefixes) {
            console.log('--- DEBUG: No album folders found in gallery.');
            return res.json({ albums: [] });
        }

        const albumPromises = folders.prefixes.map(async (folder) => {
            const folderName = folder.name.split('/').slice(-2, -1)[0];
            const [files] = await bucket.getFiles({ prefix: folder.name, limit: 1 });
            
            let firstImage = null;
            if (files.length > 0 && !files[0].name.endsWith('/')) {
                const [url] = await files[0].getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                });
                firstImage = url;
            }
            
            return {
                folderNameReal: folder.name, // This will now include the full path like 'imagePersonalWebsite/gallery/album-name/'
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
// This endpoint does not need to change, as it receives the full path from the client
app.get('/api/get-images-album', async (req, res) => {
    const albumPath = req.query.album;
    if (!albumPath) {
        return res.status(400).send('Album path is required');
    }
    try {
        const files = await getSignedUrls(albumPath);
        res.json({ files });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app);