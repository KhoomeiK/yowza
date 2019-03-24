const express = require('express');
const cors = require('cors');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 8080;
const production = process.env.NODE_ENV === 'production';

const server = express();
server.use(cors());

// Host built files if production
if (production) {
  server.use(express.static(path.join(__dirname, 'build')));

  // Main page (if an ID is provided, it will be the first rendered post)
  server.get('/:id?', (req, res) => {
    return res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

server.get('/api/:id?', (req, res) => {
  const posts = {
    1: { title: 'Title', content: 'Content' },
    2: { title: 'Title', content: 'Content' },
    3: { title: 'Title', content: 'Content' },
    4: { title: 'Title', content: 'Content' },
    5: { title: 'Title', content: 'Content' },
    6: { title: 'Title', content: 'Content' },
    7: { title: 'Title', content: 'Content' }
  };
  res.send(posts);
});

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
