const express = require('express');
const { fetchArticle } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ extended: false }));
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.get('/', (req, res) => {
  res.send('Welcome to Yowza!');
});

app.get('/a/:slug', async (req, res) => {
  res.send(await fetchArticle(req.params.slug));
});

app.get('/*', (req, res) => {
  res.send('Error 404');
});
