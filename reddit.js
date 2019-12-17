const Snoowrap = require('snoowrap');

(async () => {
  const r = new Snoowrap({
    username: "WebsterBot",
    password: "G*c-+#6d^8V%$_6=",
    client_id: "_fRmFVzOM5jYHQ",
    client_secret: "o_jPN2Mou9UbAJzN5I3zybCaKjo",
    user_agent: "actualsnek wtwbot test 0.0"
  });

  const top = await r.getSubreddit('AskReddit').getTop();
  const doc = await Promise.all(top.filter(p => p.score > 3000).map(async p => {
    const post = await p.expandReplies({ depth: 1, limit: 3 });
    const comments = post.comments.filter(c => c.score > p.score / 4).map(c => c.body);
    let { title } = post;
    if (title.indexOf('reddit') !== -1)
      title = title.splice(title.indexOf('reddit'), 6);
    return { post: title, comments: Array.from(comments) };
  }));
  console.log(doc);
  // TODO: push doc, which represents one article, into the database
})();
