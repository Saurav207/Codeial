const mongoose = require('mongoose');
const env = require('./enviornment');
mongoose.connect(`mongodb://localhost/${env.db}`);  //why localhost --> because it is running on same system  and in db name whatever you want name it

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connnecting to mongoDB'));

db.once('open', function() {
    console.log("connection to database :: MongoDB");

});

module.exports = db;