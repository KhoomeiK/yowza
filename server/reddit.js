const Snoowrap = require('snoowrap');
const Slug = require('slug');
const mongoose = require('mongoose');
const config = require('config');
const Post = require('./models/Post');

const db = config.get('mongoURI');

const processTitle = (rawTitle) => {
  let finalTitle = rawTitle.trim();

  const regexp = /(.*)( of [Rr]eddit[:,]? ?)/g;
  const matches = regexp.exec(finalTitle);

  if (matches && matches.length > 0) {
    finalTitle = finalTitle
      .replace(regexp, '') // Remove __ of Reddit
      .split('your')
      .join(`${matches[1].toLowerCase()}'`) // your -> their
      .split('you')
      .join(matches[1].toLowerCase()) // you -> __
      .split('you')
      .join('them') // Idk why this is but ok
      .trim(); // Remove extra spaces from manipulation
  }
  return (finalTitle.charAt(0).toUpperCase() + finalTitle.slice(1)).trim();
};

(async () => {
  const r = new Snoowrap({
    username: 'WebsterBot',
    password: 'G*c-+#6d^8V%$_6=',
    client_id: '_fRmFVzOM5jYHQ',
    client_secret: 'o_jPN2Mou9UbAJzN5I3zybCaKjo',
    user_agent: 'actualsnek wtwbot test 0.0',
  });

  const top = await r.getSubreddit('AskReddit').getTop();
  let docs = await Promise.all(top.filter((p) => p.score > 3000).map(async (p) => {
    const post = await p.expandReplies({ depth: 1, limit: 3 });
    const comments = post.comments.filter((c) => c.score > p.score / 4).map((c) => c.body);
    let { title } = post;
    title = processTitle(title);
    return { post: title, comments: Array.from(comments), slug: Slug(title) };
  }));
  docs = docs.filter((doc) => !(/[Rr]eddit/g.exec(doc.post)));
  //console.log(docs);

  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected...');
    await Promise.all(
      docs.map(async (element) => {
        const { post, comments } = element;
        const finalPost = new Post({
          post,
          comments,
        });
        await finalPost.save();

      }),
    );
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit();
  }

  // TODO: push doc, which represents one article, into the database
})();

/*
- TODO: comment cleaning
- [edited], [deleted]
- Edit:
https://github.com/KhoomeiK/yowza/blob/785f3ded3411a8b082411ba191659cce95cc8aab/src/pages/index.js
*/
