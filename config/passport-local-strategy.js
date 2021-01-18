const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done) {
    //find a user and establish the identity
User.findOne({email: email}, function(err, user) {
    if(err) {
        console.log('error in finding user --> Passport');
        return done(err);
    }
    if(!user || user.password != password) {
        console.log('Inalid username/password');
        return done(null, false);
    }
    return done(null, user);
});
}
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user) {
       if(err) {
           console.log('error in finding the user -- >passport');
           return done(null, false);
       }
       return done(null, user);
    });
});

//check  if the user is authenticated
passport.checkAuthentication = function(req, res,next) {
    if(req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/user/Signin');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;