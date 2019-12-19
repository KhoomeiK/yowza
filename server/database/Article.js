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
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
  views: {
    type: Number,
    default: 0,
    required: false,
  },
  images: { // image URL
    type: String,
    default: '',
    required: false,
  },
});

const Article = mongoose.model('post', ArticleSchema);
module.exports = Article;
