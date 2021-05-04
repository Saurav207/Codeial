const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailer/comment_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../worker/comment_email_worker');

module.exports.create = async function(req, res) {
     try{
        let post = await Post.findById(req.body.post);   //name of id is post and here we check that this is authorized post or not  

        //if post is found theen create the comment
           if(post) {
               let comment = await Comment.create({
                   content: req.body.content,
                   post: req.body.post,
                   user: req.user._id
               });
       
       
               post.comments.push(comment);
               post.save();

               comment = await comment.populate('user', 'name email').execPopulate();
                // commentMailer.newComment(comment);
               let job =  queue.create('emails', comment).save(function(err) {
                    if(err) {
                        console.log('error in creating a queue');
                        return;
                    }
                 //whenever something will be enqueued that id will be here
                    console.log(job.id);
                });


               if(req.xhr) {
                   //similiar for comments to fetch the user's id!
                  
                   return res.status(200).json({
                       data: {
                           comment: comment
                       },
                       message: "post Created!"
                   });
               }
               req.flash('success', "Add comment");
            //    req.flash('error', "Default Error");
       
                res.redirect('/');
           
           }
     }
     catch(err) {
        console.log("error", err);
        return;
     }

}

module.exports.destroy = async function(req, res) {
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
  
            let post = Post.findByIdAndUpdate(postId, { $pull : {comments: req.params.id}});
           //send the comment id which was deleted back to the views 
            if(req.xhr) {
                return res.status(200), json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "post deleted!"
                })
            }
            req.flash('success', "Comment got deleted");


                return res.redirect('back');
                 
            
        }
        else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err) {
        console.log("error", err);
        return;
    }
    
    
}