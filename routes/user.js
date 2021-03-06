const express = require('express');

const router = express.Router();
const passport = require('passport');
// const passport = require('passport');


const userController =  require('../controller/user-controller');
// const postController = require('../controller/post-controller');

router.get('/profile/:id',passport.checkAuthentication, userController.profile);

router.post('/update/:id',passport.checkAuthentication, userController.update);

// router.get('/post', postController.post);
router.get('/Signup', userController.SignUp);
router.get('/Signin' , userController.SignIn);
router.post('/create', userController.create);
// router.post('/create-session', userController.createSession);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/Signin'},
) , userController.createSession);
router.get('/signOut', userController.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/Signin'}),userController.createSession);
module.exports = router;