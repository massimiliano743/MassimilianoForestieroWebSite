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

app.use(express.static(buildPath));
app.use('/imagePersonalWebsite/Home', express.static(homeImagePath));
app.use('/imagePersonalWebsite/Profile', express.static(profileImagePath));

app.get('/api/get-image-hp-slider', (req, res) => {
  console.log('folder =', homeImagePath)
  fs.readdir(homeImagePath, (err, files) => {
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
