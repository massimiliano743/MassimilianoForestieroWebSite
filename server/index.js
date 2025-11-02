const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");

// --- FINAL, CORRECT, ROBUST INITIALIZATION --- //

// Always define the target bucket. The emulator will intercept calls to it.
const adminConfig = {
  storageBucket: "massimilianoforesti-3914-5d676.appspot.com"
};

// If running in the emulator, provide authentication credentials from the local key.
if (process.env.FUNCTIONS_EMULATOR) {
  const serviceAccount = require(path.join(__dirname, "service-account-key.json"));
  adminConfig.credential = admin.credential.cert(serviceAccount);
}

// Initialize the app with a single, consistent configuration.
admin.initializeApp(adminConfig);


const mainApp = express();
mainApp.use(cors({ origin: true }));

// This works because the app was initialized with a default bucket.
const bucket = admin.storage().bucket();

// --- Reusable Helper Function (No changes) --- //
async function getUrlsForFiles(folderPath) {
  try {
    const [files] = await bucket.getFiles({ prefix: folderPath });
    if (files.length === 0) return [];

    const maxExpiration = 7 * 24 * 60 * 60 * 1000;
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + maxExpiration,
    };

    const signedUrls = await Promise.all(
      files.map(async (file) => {
        if (file.name.endsWith('/')) return null;
        const [url] = await file.getSignedUrl(options);
        return url;
      })
    );
    return signedUrls.filter(url => url !== null);
  } catch (error) {
    console.error(`--- ERROR in getUrlsForFiles for [${folderPath}]:`, error);
    throw error;
  }
}

// --- API Router (No changes) --- //
const apiRouter = express.Router();

apiRouter.get("/get-image-profile", async (req, res) => {
  try {
    const files = await getUrlsForFiles("imagePersonalWebsite/image-profile/");
    res.json({ file: files.length > 0 ? files[0] : null });
  } catch (error) {
    console.error("--- ERROR in /get-image-profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

apiRouter.get("/get-latest-images", async (req, res) => {
  try {
    const files = await getUrlsForFiles("imagePersonalWebsite/Home/");
    res.json({ files: files });
  } catch (error) {
    console.error("--- ERROR in /get-latest-images:", error);
    res.status(500).send("Internal Server Error");
  }
});

apiRouter.get("/get-gallery-albums", async (req, res) => {
  try {
    const [ , , apiResponse] = await bucket.getFiles({ prefix: 'imagePersonalWebsite/Gallery/', delimiter: '/' });
    const prefixes = apiResponse.prefixes;
    if (!prefixes || prefixes.length === 0) return res.json({ albums: [] });

    const albumPromises = prefixes.map(async (prefix) => {
        const folderName = prefix.split('/').slice(-2, -1)[0];
        const filesInFolder = await getUrlsForFiles(prefix);
        return {
            folderName: folderName,
            folderNameReal: prefix,
            firstImage: filesInFolder.length > 0 ? filesInFolder[0] : null
        };
    });
    const albums = await Promise.all(albumPromises);
    res.json({ albums });
  } catch (error) {
    console.error("--- ERROR in /get-gallery-albums:", error);
    res.status(500).send("Internal Server Error");
  }
});

// --- Mount the router (No changes) --- //
mainApp.use('/', apiRouter);
mainApp.use('/api', apiRouter);

// Expose the main app as a single Cloud Function
exports.api = functions.https.onRequest(mainApp);
