const express = require('express');
// const mongoose = require('mongoose');

const app = express();
const port = 3000;

// mongoose.connect('DATABASE_URL', { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log('connected to database'));

app.get('/', (req, res) => {
  res.send(req.path);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
