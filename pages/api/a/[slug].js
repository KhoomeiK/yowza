const { fetchArticle } = require('@src/database/db');

/**
 * Whether or not the given object is empty
 * @param {Object} obj
 */
function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

/**
 * Article: /api/a/:slug
 *
 * @description
 * Fetches a specific article with the given slug and increments its view count by one.
 *
 * @example
 * ```jsonc
 * {
 *   "slug": "Article_Title",
 *   "post": "Article Title",
 *   "date": "2019-12-18T03:01:02.029Z"
 *   "images": "http://path.to/image.png", // optional
 *   "views": 6, // optional
 *   "comments": [
 *     "example comment"
 *     // ...
 *   ],
 * }
 * ```
 */
export default async (req, res) => {
  try {
    const { slug } = req.query;

    // Check if URL itself is incorrect
    if (!slug) {
      res.status(404);
      res.send('Error: Page not found');
      return;
    }

    const article = await (await fetchArticle(slug)).toJSON();

    // If the article did not error but is somehow empty, 404 early
    if (!article || isEmpty(article)) {
      res.status(404);
      res.send(`Error: No article found with slug "${slug}"`);
      return;
    }

    res.send(article);
  } catch (err) {
    if (err.message.includes('No article found')) res.status(404); // 404 not found
    else res.status(500); // 500 Internal Server Error
    res.send(`Error: ${err.message}`);
  }
};
