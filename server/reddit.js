const Snoowrap = require('snoowrap');
const Slug = require('slug');
const { imageFromText, processTitle } = require('./textProcessing');
const { saveArticles } = require('./database/db');
const {
  username, password, clientId, clientSecret, userAgent,
} = require('./database/.env.json');

(async () => {
  const r = new Snoowrap({
    username, password, clientId, clientSecret, userAgent,
  });

  try {
    const top = await r.getSubreddit('AskReddit').getTop({ time: 'day' }); // fetch top AskReddit posts for today
    const docs = await Promise.all(top.filter((p) => p.score > 3000).map(async (p) => {
      const post = await p.expandReplies({ depth: 1, limit: 3 }); // load comments
      const comments = Array.from(post.comments).filter((c) => !c.body.includes('[deleted]')).sort((a, b) => b.score - a.score).slice(0, 10)
        .map((c) => c.body);
      const image = await imageFromText(post.title);
      // const image = '/NULL/';

      return { // Article object
        post: post.title,
        comments: comments.map((comment) => ({
          text: comment,
          // image: comment.length < 40 ? await imageFromText(comment) : undefined,
        })),
        slug: `${Slug(post.title).toLowerCase()}-${post.id}`,
        image,
      };
    }));

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
