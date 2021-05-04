const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function(req, res) {
    try{
        let post = await Post.create({
            //from where I create a post
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            })
        }
        req.flash('success', "Post Published!");
        return res.redirect('back');
    }catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
  
}

module.exports.destroy = async function(req, res) {
    try{
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into string 
        //and here check the user who is deleteing the post is user who  creating the post
        if(post.user == req.user.id) {



            //delete the associated likes for the post and all its comments likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comment}});


            post.remove();

            await  Comment.deleteMany({post: req.params.id});
            
             if(req.xhr) {
                 return res.status(200).json({
                     data: {
                         post_id: req.params.id
                     },
                     message: "post deleted!!"
                 });
             }

            req.flash('success', "Post and related comments deleted!");
            
            return res.redirect('back');
            
        
        }
        else {

            req.flash('error', "You can't delete the post");
            return res.redirect('back');
        }
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
   
}

