const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 8080;
const production = process.env.NODE_ENV === 'production';

const server = express();

server.use(cors());
server.use(bodyParser.json());

// MongoDB/API
const mongo = require('mongodb').MongoClient;
server.post('/api', (req, res) => {
  const arr = req.body.used;

  mongo.connect("mongodb://localhost:27017/", async (err, db) => {
    if (err) throw err;

    let dbo = db.db("test");
    let post;

    do {
      post = await dbo.collection("posts").aggregate([{
        $sample: {
          size: 1
        }
      }]).next();
    } while (arr.indexOf(post.data[0]) != -1); // while post id isnt in array
    // need to account for if all posts are read
    res.send(post.data);
    db.close();
  });
});

// Host built files if production mode
if (production) {
  server.use(express.static(path.join(__dirname, 'build')));

  // Main page (if an ID is provided, it will be the first rendered post)
  server.get('/:id?', (req, res) => {
    return res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


  // Production, custom IP
  server.listen(port, '0.0.0.0', err => {
    if (err) throw err;
    console.log(`> Ready on http://35.247.79.142/:${port}`);
  });
} else {
  // Not production, localhost
  server.listen(port, err => {
    if (err) throw err;
    if (production)
      console.log(`> Ready on http://localhost/:${port}`);
  })
}

// let x = await axios.post('http://35.247.79.142/api', { "used": ["b4kww0", "b4iash"] });
