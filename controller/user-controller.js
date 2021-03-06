//session he create nhi horha cookie he nhi bn rhu ?
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res) {
    // if(req.cookies.user_id) {
        User.findById(req.params.id, function(err, user) {
           
                return res.render('user_profile', {
                    title: "hey",
                    profile_user : user
                });
                
            });
        }        
    //         return res.redirect('/user/Signin');
    //     });
    // } else {
    //     return res.redirect('/user/Signin');
    // }
    
    
module.exports.update = async function(req, res) {
    // if(req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    //         return res.redirect('back');
    //     });
    // } else {
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id) {

        try{
            let user = await User.findById(req.params.id);
             User.uploadAvatar(req, res, function(err) {
                 if(err) {console.log('****Multer Error', err)}
                 user.name = req.body.name;
                 user.email = req.body.email;

                if(req.file) {

                    if(user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    //this is saving the path of the uploading file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');

             });
        }catch(err) {
            req.flash('error', err);
            return res.redirect('back');
        }

    }else {
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}




//Render SignUp page 
module.exports.SignUp = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up', {
        title : 'Codeial | Sign Up'

    });
}
//render SignIn page 
module.exports.SignIn = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in', {
        title : 'Codeial | Sign In'

    });
}
//get the SignUp Data
module.exports.create = function(req, res) {
    if(req.body.password != req.body.Confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
                   if(err) {
                       console.log('error in finding user in sign up');
                       return;
                   }
                   if(!user) {
                       User.create(req.body, function(err, user){
                        if(err) {
                            console.log('error in creating user while sign up');
                            return;
                        }
                        return res.redirect('/user/SignIn');
                       })
                   }
                   else {
                       return res.redirect('back');
                   }

    });

   
}


//Get the SignIn data
module.exports.createSession = function(req, res) {
   
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
     req.logout();

     req.flash('success', 'You have Logged out ');
     
     return res.redirect('/');
}