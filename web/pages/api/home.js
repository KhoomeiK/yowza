const { fetchRandom } = require('@src/database/db');

/**
 * Home: /api/home
 *
 * @description
 * Fetches 5 random articles from the database without their main content.
 * You can then request for the individual slugs to load the articles.
 *
 * @example
 * ```jsonc
 * [
 *   {
 *     "slug": "Article_Title",
 *     "post": "Article Title",
 *     "images": "http://path.to/image.png", // optional
 *     "views": 6, // optional
 *   },
 *   // ...
 * ]
 * ```
 */
export default async (req, res) => {
  try {
    // fetches 5 random posts that don't include loadedArticles
    const articles = await fetchRandom(5, req.body ? req.body.loadedArticles : []);
    res.send(articles);
  } catch (err) {
    res.status(500); // 500 Internal Server Error
    res.send(`Error: ${err.message}`);
  }
};
