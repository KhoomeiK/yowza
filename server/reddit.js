const Snoowrap = require('snoowrap');
const Slug = require('slug');
// const marked = require('marked');
const { imageFromText, processTitle } = require('./textProcessing');
const { saveArticles } = require('./database/db');
const {
  username, password, clientId, clientSecret, userAgent,
} = require('./database/.env.json');

(async () => {
  const r = new Snoowrap({ // reddit API wrapper
    username, password, clientId, clientSecret, userAgent,
  });

  try {
    const top = await r.getSubreddit('AskReddit').getTop(); // fetch top AskReddit posts for today
    let docs = await Promise.all(top.filter((p) => p.score > 3000).map(async (p) => {
      const post = await p.expandReplies({ depth: 1, limit: 3 }); // load comments
      const comments = post.comments.filter((c) => c.score > p.score / 4).map((c) => c.body);
      let { title } = post;
      title = processTitle(title); // title cleaning
      return { // Article object
        post: title,
        comments: Array.from(comments),
        slug: Slug(title).toLowerCase(),
      };
    })); // builds array of Article objects
    docs = docs.filter((doc) => !(/[Rr]eddit/g.exec(doc.post))); // final filtering
    docs = await Promise.all(docs.map(async (doc) => ({
      ...doc,
      image: await imageFromText(doc.post),
      comments: await Promise.all(doc.comments.map(async (comment) => ({
        text: comment,
        image: comment.length < 40 ? await imageFromText(comment) : undefined,
      }))),
    })));
    console.log(docs);
    await saveArticles(docs); // uploads to Mongo
  } catch (err) {
    console.log('Could not fetch from Reddit', err);
  }
})();

/*
- TODO: comment cleaning
- [edited], [deleted]
- Edit:
https://github.com/KhoomeiK/yowza/blob/785f3ded3411a8b082411ba191659cce95cc8aab/src/pages/index.js
*/
