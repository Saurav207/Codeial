const Comment = require('../models/comment');
const Post = require('../models/post');
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
            req.flash('success', "Comment got deleted");

            let post = await Post.findByIdAndUpdate(postId, { $pull : {comments: req.params.id}});
                return res.redirect('back');
                 
            
        }
        else {
            return res.redirect('back');
        }
    }catch(err) {
        console.log("error", err);
        return;
    }
    
    
}