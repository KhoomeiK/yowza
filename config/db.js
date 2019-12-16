const mongoose = require('mongoose'); // gets the mongoose package

const config = require('config'); // gets the config package, which allows this file to get properties from default.json

const db = config.get('mongoURI'); // gets the mongodb string

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};
module.exports = connectDB; // allows for the connectDB function to be exported for use in index.js
