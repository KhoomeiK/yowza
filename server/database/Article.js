const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  comments: {
    type: [String],
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model('post', ArticleSchema);
module.exports = Article;
