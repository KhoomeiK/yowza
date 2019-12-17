const Snoowrap = require('snoowrap');
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const Post = require('./models/Post');
(async () => {
  const r = new Snoowrap({
    username: 'WebsterBot',
    password: 'G*c-+#6d^8V%$_6=',
    client_id: '_fRmFVzOM5jYHQ',
    client_secret: 'o_jPN2Mou9UbAJzN5I3zybCaKjo',
    user_agent: 'actualsnek wtwbot test 0.0'
  });

  const top = await r.getSubreddit('AskReddit').getTop();
  const doc = await Promise.all(
    top
      .filter(p => p.score > 3000)
      .map(async p => {
        const post = await p.expandReplies({ depth: 1, limit: 3 });
        const comments = post.comments
          .filter(c => c.score > p.score / 4)
          .map(c => c.body);
        let { title } = post;
        // if (title.indexOf('reddit') !== -1) {
        // title = title.splice(title.indexOf('reddit'), 6);
        // }
        return { post: title, comments: Array.from(comments) };
      })
  );
  console.log(doc);
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected...');
    await Promise.all(
      doc.map(async element => {
        const { post, comments } = element;
        //console.log(comments);
        const finalPost = new Post({
          post,
          comments
        });
        await finalPost.save();
      })
    );
  } catch (err) {
    console.error(err.message);
    process.exit();
  }

  // TODO: push doc, which represents one article, into the database
})();
