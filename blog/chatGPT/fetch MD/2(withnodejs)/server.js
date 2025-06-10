const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const postsDir = path.join(__dirname, 'posts');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/posts', express.static(postsDir));

// Endpoint to list all .md files
app.get('/api/posts', (req, res) => {
  fs.readdir(postsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Unable to list posts' });
    const mdFiles = files.filter(f => f.endsWith('.md'));
    res.json(mdFiles);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
