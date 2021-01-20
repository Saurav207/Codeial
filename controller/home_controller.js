const Post = require('../models/post')

module.exports.home  = function(req, res) {
   // return res.end('<h1>Express is up for Codeial</h1>');
   // console.log(req.cookies);
   // res.cookie('user_id', 21);
   // res.cookie('user_id2', 51);
   // Post.find({}, function(err, posts) {
   //    return res.render('home', {
   //       title: 'Codeial | Home',
   //       posts: posts
   //    });
   // });
    //populate the user of each post
   Post.find({}).populate('user').exec(function(err, posts) {
      return res.render('home', {
         title: 'Codeial | Home',
         posts: posts
      });
   })
   
}

