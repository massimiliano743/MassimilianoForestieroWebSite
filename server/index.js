const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

const isProd = process.env.NODE_ENV === 'production';
const baseDir = isProd
    ? '/var/www/massimilianoforestiero'
    : path.resolve(__dirname, '..'); // locale

const buildPath = path.join(baseDir, 'build');
const homeImagePath = path.join(baseDir, 'imagePersonalWebsite', 'Home');
const profileImagePath = path.join(baseDir, 'imagePersonalWebsite', 'Profile');

// Serve build React
app.use(express.static(buildPath));

// Serve immagini statiche
app.use('/imagePersonalWebsite/Home', express.static(homeImagePath));
app.use('/imagePersonalWebsite/Profile', express.static(profileImagePath));

// API di test
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Sito in costruzione Test 02' });
});

// API per leggere le immagini dello slider
app.get('/api/get-image-hp-slider', (req, res) => {
  try {
    const files = fs.readdirSync(homeImagePath);
    const filteredFiles = files.filter(file => !file.startsWith('.'));
    res.json({filteredFiles});
  } catch (err) {
    console.error('Errore nella lettura della cartella:', err.message);
    res.status(500).json({error: 'Errore nella lettura della cartella'});
  }
});

// Tutte le altre route ritornano index.html per React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Porta
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT} | ENV: ${process.env.NODE_ENV}`);
});
