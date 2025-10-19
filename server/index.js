const path = require('path');
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

const isProd = process.env.NODE_ENV === 'production';
const baseDir = isProd
    ? '/root/MassimilianoForestieroWebSite' // cartella reale con le immagini
    : path.resolve(__dirname, '..');        // locale

const buildPath = path.join(baseDir, 'build');
const homeImagePath = path.join(baseDir, 'imagePersonalWebsite', 'Home');
const profileImagePath = path.join(baseDir, 'imagePersonalWebsite', 'Profile');
const portfolioImagePath = path.join(baseDir, 'imagePersonalWebsite', 'Portfolio');
const galleryImagePath = path.join(baseDir, 'imagePersonalWebsite', 'Gallery');

app.use(express.static(buildPath));
app.use('/imagePersonalWebsite/Home', express.static(homeImagePath));
app.use('/imagePersonalWebsite/Profile', express.static(profileImagePath));
app.use('/imagePersonalWebsite/Portfolio', express.static(portfolioImagePath));
app.use('/imagePersonalWebsite/Gallery', express.static(galleryImagePath));

app.get('/api/get-image-hp-slider', (req, res) => {
  fs.readdir(homeImagePath, (err, files) => {
    if (err) {
      console.error('Errore nella lettura della cartella:', err);
      return res.status(500).json({error: 'Errore nella lettura della cartella'});
    }
    const filteredFiles = files.filter(f => !f.startsWith('.'));
    res.json({filteredFiles});
  });
});
app.get('/api/get-image-gallery-portfolio', (req, res) => {
  fs.readdir(portfolioImagePath, (err, files) => {
    if (err) {
      console.error('Errore nella lettura della cartella:', err);
      return res.status(500).json({error: 'Errore nella lettura della cartella'});
    }
    const filteredFiles = files.filter(f => !f.startsWith('.'));
    res.json({filteredFiles});
  });
});
app.get('/api/get-name-folders-gallery', async (req, res) => {
  try {
    const folders = (await fs.promises.readdir(galleryImagePath)).filter(f => !f.startsWith('.'));
    const result = await Promise.all(folders.map(async folderName => {
      const imgDir = path.join(galleryImagePath, folderName, 'img');
      try {
        const images = (await fs.promises.readdir(imgDir)).filter(f => !f.startsWith('.'));
        return {folderName, firstImage: images[0] || null};
      } catch {
        return {folderName, firstImage: null};
      }
    }));
    res.json(result);
  } catch (err) {
    console.error('Errore nella lettura delle cartelle:', err);
    res.status(500).json({error: 'Errore nella lettura delle cartelle'});
  }
});

app.get('/api/get-first-image-folders-gallery', (req, res) => {
  fs.readdir(galleryImagePath + `/${req.query.folderName}/img`, (err, files) => {
    if (err) {
      console.error('Errore nella lettura della cartella:', err);
      return res.status(500).json({error: 'Errore nella lettura della cartella'});
    }
    const filteredFiles = files.filter(f => !f.startsWith('.'));
    res.json({filteredFiles});
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));
