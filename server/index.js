const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve i file statici della build di React
app.use(express.static(path.join(__dirname, '../build')));

// API example
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Sito in costruzione Test 01' });
});

// Per tutte le altre route, ritorna index.html (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
