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

const fetchArticle = async (slug) => {
  try {
    await connectDB();
    let article = await Article.findOne({ slug });
    if (article) {
      console.log(article)
      return article
    }

  } catch (err) {
    console.error('Could not fetch from database');
    return 'This article does not exist';
  }
};

const saveArticles = async (docs) => {
  let savedCount = 0 // counts how many docs are saved
  try { // database connection
    await connectDB();
    await Promise.all(
      docs.map(async (element) => {
        const { post, comments, slug } = element;
        // TODO: check if article already in database
        let finalPost = await Article.findOne({ slug });
        if (!finalPost) {
         finalPost = new Article({
          post,
          comments,
          slug,
        });
        await finalPost.save(); // adds article to database
        savedCount++
      }
      }),
    );
    console.log('Articles saved:', savedCount);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

module.exports = { connectDB, fetchArticle, saveArticles };
