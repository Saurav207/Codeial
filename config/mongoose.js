const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_devlopment');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connnecting to mongoDB'));

db.once('open', function() {
    console.log("connection to database :: MongoDB");

});

module.exports = db;