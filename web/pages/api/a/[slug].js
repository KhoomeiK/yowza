const { fetchArticle } = require('@src/database/db');

/**
 * Whether or not the given object is empty
 * @param {any} obj
 */
function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export default async (req, res) => {
  try {
    const {
      query: { slug },
    } = req;
    const article = await (await fetchArticle(slug)).toJSON();
    // If the article did not error but is somehow empty, 404 early
    if (article === undefined || isEmpty(article)) {
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
