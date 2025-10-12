const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Serve i file statici della build di React
app.use(express.static(path.join(__dirname, '../build')));
app.use('/imagePersonalWebsite/Home', express.static(path.join(__dirname, '../imagePersonalWebsite/Home')));
app.use('/imagePersonalWebsite/Profile', express.static(path.join(__dirname, '../imagePersonalWebsite/Profile')));

// API example
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Sito in costruzione Test 02' });
});

app.get('/api/get-image-hp-slider', (req, res) => {
  const folderPath = path.join(__dirname, '../imagePersonalWebsite/Home');
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({error: 'Errore nella lettura della cartella'});
    }
    console.log(files)
    const filteredFiles = files.filter(file => !file.startsWith('.'));
    console.log(filteredFiles)
    res.json({filteredFiles});
  });
});

// Per tutte le altre route, ritorna index.html (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
