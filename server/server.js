const express = require('express');
const cors = require('cors');
const { fetchRandom, fetchArticle } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));
app.use(cors());
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// UTILS

/**
 * Whether or not the given object is empty
 * @param {any} obj
 */
function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

// ROUTES

app.get('/', async (req, res) => {
  try {
    const articles = await fetchRandom(5); // fetches 5 random posts
    res.send(articles);
  } catch (err) {
    res.status(500); // 500 Internal Server Error
    res.send(`Error: ${err.message}`);
  }
});

app.get('/random', async (req, res) => {
  try {
    // TODO: This could also be handled through an HTTP redirect but idk if that's worth/good
    const article = (await fetchRandom(1))[0]; // fetches 1 random post
    // Only need the slug to navigate to it
    res.send(article);
  } catch (err) {
    res.status(500); // 500 Internal Server Error
    res.send(`Error: ${err.message}`);
  }
});

app.get('/a/:slug', async (req, res) => {
  try {
    const article = await (await fetchArticle(req.params.slug)).toJSON();
    // If the article did not error but is somehow empty, 404 early
    if (article === undefined || isEmpty(article)) {
      res.status(404);
      res.send(`Error: No article found with slug "${req.params.slug}"`);
      return;
    }

    res.send(article);
  } catch (err) {
    if (err.message.includes('No article found')) res.status(404); // 404 not found
    else res.status(500); // 500 Internal Server Error
    res.send(`Error: ${err.message}`);
  }
});

app.get('/*', (req, res) => {
  res.status(404);
  res.send('Error: Endpoint does not exist');
});
