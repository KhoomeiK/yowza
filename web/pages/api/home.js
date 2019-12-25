const { fetchRandom } = require('@src/database/db');

export default async (req, res) => {
  try {
    const articles = await fetchRandom(5); // fetches 5 random posts
    res.send(articles);
  } catch (err) {
    res.status(500); // 500 Internal Server Error
    res.send(`Error: ${err.message}`);
  }
};
