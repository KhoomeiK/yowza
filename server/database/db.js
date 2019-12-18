const mongoose = require('mongoose');
const Article = require('./Article');

const { db } = require('./default.json'); // gets the mongodb string

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
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
    // TODO @Abhinav: fetch article based on passed slug
    return slug;
  } catch (err) {
    console.error('Could not fetch from database');
    return 'This article does not exist';
  }
};

const saveArticles = async (docs) => {
  try { // database connection
    await connectDB();
    await Promise.all(
      docs.map(async (element) => {
        const { post, comments, slug } = element;
        // TODO: check if article already in database
        const finalPost = new Article({
          post,
          comments,
          slug,
        });
        await finalPost.save(); // adds article to database
      }),
    );

    console.log('Articles saved:', docs.length);
    process.exit();
  } catch (err) {
    console.error('Could not post to database');
    process.exit();
  }
};

module.exports = { connectDB, fetchArticle, saveArticles };
