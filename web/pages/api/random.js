const { fetchRandom } = require('@src/database/db');


export default async (req, res) => {
  try {
    // TODO: This could also be handled through an HTTP redirect but idk if that's worth/good
    const article = (await fetchRandom(1))[0]; // fetches 1 random post
    // Only need the slug to navigate to it
    if (!article) {
      res.status(400);
      return res.send('Error: No random posts found');
    }
    return res.send(article);
  } catch (err) {
    res.status(500); // 500 Internal Server Error
    return res.send(`Error: ${err.message}`);
  }
};
