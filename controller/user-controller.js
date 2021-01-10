const User = require('../models/user');


module.exports.profile = function(req, res) {
    return res.render('user-profile', {
        title: "hey"
    });
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
    //todo later
}