const express = require('express');
const next = require('next');
const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 80;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  server.post('/api', (req, res) => {
    const arr = req.body.used;

    mongo.connect("mongodb://localhost:27017/", async (err, db) => {
      if (err) throw err;

      let dbo = db.db("test");
      let post;

      do {
        post = await dbo.collection("posts").aggregate([{ $sample: { size: 1 } }]).next();
      } while (arr.indexOf(post.data[0]) != -1); // while post id isnt in array
      // need to account for if all posts are read
      res.send(post.data);
      db.close();
    });
  });

  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });


  server.listen(port, '0.0.0.0', err => {
    if (err) throw err;
    console.log(`> Ready on http://35.247.79.142/:${port}`);
  });
});

// curl -d '{"used": ["b4kww0", "b4iash"]}' -H "Content-Type: application/json" -X POST http://localhost:3000/api
