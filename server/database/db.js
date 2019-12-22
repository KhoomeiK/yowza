const mongoose = require('mongoose');
const Article = require('./Article');

const { mongoURI } = require('./.env.json'); // gets the mongodb string

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Could not connect to database');
    process.exit();
  }
};

const fetchRandom = async (num) => {
  try {
    await connectDB();
    const articles = Article.aggregate()
      // Specify who many articles to fetch
      .sample(num || 5)
      // Specify which fields to fetch
      .project({
        images: 1,
        post: 1,
        slug: 1,
        views: 1,
        _id: 0, // ID must be specifically excluded
      });
    return articles;
  } catch (err) {
    console.error(`Coult not fetch random from database: ${err.message}`);
    throw new Error(`Coult not fetch random from database: ${err.message}`);
  }
};

const fetchArticle = async (slug) => {
  try {
    await connectDB();
    const article = await Article.findOne({ slug })
      // Specify which fields to fetch
      .select({
        // Anything not specified here is auto-excluded
        comments: 1,
        views: 1,
        images: 1,
        post: 1,
        slug: 1,
        date: 1,
        _id: 0, // ID must be specifically excluded
      });

    if (!article) {
      throw new Error(`No article found with slug "${slug}"`);
    }

    await article.updateOne({ views: article.views + 1 });
    return article;
  } catch (err) {
    console.error(`Coult not fetch article from database: ${err.message}`);
    throw new Error(`Coult not fetch article from database: ${err.message}`);
  }
};

const saveArticles = async (docs) => {
  let savedCount = 0; // counts how many docs are saved
  try {
    // database connection
    await connectDB();
    await Promise.all(
      docs.map(async (element) => {
        let { post } = element;
        const { comments, slug } = element;
        // early comment cleaning
        if (post.startsWith('[Serious] ')) {
          post = post.replace('[Serious] ', '');
        }
        for (let i = comments.length - 1; i >= 0; i -= 1) {
          if (comments[i].includes('reddit')) {
            comments.splice(i, 1);
          }
        }
        // this lowkey wack af i dont really know how else to clean comments
        let finalPost = await Article.findOne({ slug });
        if (!finalPost) {
          finalPost = new Article({
            post,
            comments,
            slug,
          });
          await finalPost.save(); // adds article to database
          savedCount += 1;
        }
      }),
    );
    console.log('Articles saved:', savedCount);
    process.exit();
  } catch (err) {
    console.error('Could not save articles to database', err);
    process.exit();
  }
};

module.exports = {
  connectDB,
  fetchRandom,
  fetchArticle,
  saveArticles,
};
