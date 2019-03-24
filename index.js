const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Main page (if an ID is provided, it will be the first rendered post)
  server.get('/:id?', (req, res) => {
    const posts = {
      1: { title: 'Title', content: 'Content' },
      2: { title: 'Title', content: 'Content' },
      3: { title: 'Title', content: 'Content' },
      4: { title: 'Title', content: 'Content' },
      5: { title: 'Title', content: 'Content' },
      6: { title: 'Title', content: 'Content' },
      7: { title: 'Title', content: 'Content' }
    };

    return app.render(req, res, '/', { ...req.query, posts });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
