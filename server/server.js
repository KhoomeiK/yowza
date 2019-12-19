const express = require('express');
const { fetchRandom, fetchArticle } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.get('/', async (req, res) => {
  let articles = await fetchRandom(5); // fetches 5 random posts
  articles = articles.map((article) => ({ // only return these properties
    post: article.post,
    slug: article.slug,
    views: article.views,
  }));
  res.send(articles);
});

app.get('/random', async (req, res) => {
  res.send(await fetchRandom(1)); // fetches 1 random post
});

app.get('/a/:slug', async (req, res) => {
  res.send(await fetchArticle(req.params.slug));
});

app.get('/*', (req, res) => {
  res.send('Error 404');
});
