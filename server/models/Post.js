const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  comments: {
    type: [String],
    required: true,
  },
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
