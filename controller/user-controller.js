//session he create nhi horha cookie he nhi bn rhu ?
const User = require('../models/user');


module.exports.profile = function(req, res) {
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err, user) {
            if(user) {
                return res.render('user_profile', {
                    title: "hey",
                    user : user
                });
                
            }
            return res.redirect('/user/Signin');
        });
    } else {
        return res.redirect('/user/Signin');
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
    // steps to authenticate
    // find the user
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log('error in finding the user in signing up');
            return
        }
        // handle user found    
        if (user) {
            // handle password which don't match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/');
        } else {
            // handle user not found
            return res.redirect('back');
        }
    });
}

module.exports.destroySession = function(req, res) {
     req.logout();
    return res.redirect('/');
}