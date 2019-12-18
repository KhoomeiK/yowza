const mongoose = require('mongoose');
const Article = require('./Article');

const { mongoURI } = require('./default.json'); // gets the mongodb string

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
    const articles = await Article.aggregate([{ $sample: { size: num } }]);
    return articles;
  } catch (err) {
    console.error('Could not fetch random from database');
    return 'No articles available';
  }
};

const fetchArticle = async (slug) => {
  try {
    await connectDB();
    const article = await Article.findOne({ slug });
    await article.updateOne({ views: article.views + 1 });
    return article;
  } catch (err) {
    console.error('Could not fetch article from database');
    return 'This article does not exist';
  }
};

const saveArticles = async (docs) => {
  let savedCount = 0; // counts how many docs are saved
  try { // database connection
    await connectDB();
    await Promise.all(
      docs.map(async (element) => {
        const { post, comments, slug } = element;
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
    console.error('Could not save articles to database');
    process.exit();
  }
};

module.exports = {
  connectDB, fetchRandom, fetchArticle, saveArticles,
};
