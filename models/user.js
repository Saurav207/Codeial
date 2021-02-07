const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');  //this is where I am storing all the avatars.

const userSchema = new mongoose.Schema({
    email : {
        type : String,
    required : true,
    unique : true
    },
    password: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required : true
    },
    avatar: {
        type: String
    }

    }, {
        timestamps: true
    
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));   //second argument exact path where file is need to store
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });


  //static methods
  userSchema.statics.uploadAvatar = multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;
 


const User = mongoose.model('User', userSchema);

module.exports = User;