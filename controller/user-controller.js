const User = require('../models/user');


module.exports.profile = function(req, res) {
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err, user) {
            if(user) {
                return res.render('user-profile', {
                    title: "hey",
                    user : user
                });
            }
            return res.redirect('/user/SignIn');
        });
    } else {
        return res.redirect('user/SignIn');
    }
    
    }

//Render SignUp page 
module.exports.SignUp = function(req, res) {
    return res.render('user_sign_up', {
        title : 'Codeial | Sign Up'

    });
}
//render SignIn page 
module.exports.SignIn = function(req, res) {
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
    //Steps to authentication
    //find the user
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log('error finding the user in sign in');
            return;
        }
        //handle the User

        if(user) {
            //handle the password which doesn't match
            if(user.password != req.body.password) {
                return res.redirect('back');
            }
            //handle create session
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        }
        else{
            return res.redirect('back');
        }
    });
}