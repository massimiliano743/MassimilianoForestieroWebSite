const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

const baseDir = path.resolve(__dirname);
const buildPath = path.join(baseDir, 'build');
const homeImagePath = path.join(baseDir, 'imagePersonalWebsite', 'Home');
const profileImagePath = path.join(baseDir, 'imagePersonalWebsite', 'Profile');

app.use(express.static(buildPath));
app.use('/imagePersonalWebsite/Home', express.static(homeImagePath));
app.use('/imagePersonalWebsite/Profile', express.static(profileImagePath));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Sito in costruzione Test 02' });
});

app.get('/api/get-image-hp-slider', (req, res) => {
  try {
    const files = fs.readdirSync(homeImagePath);
    const filteredFiles = files.filter(file => !file.startsWith('.'));
    res.json({filteredFiles});
  } catch (err) {
    res.status(500).json({error: 'Errore nella lettura della cartella'});
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
