const express = require('express');
const router = express.Router();

const userController =  require('../controller/user-controller');
const postController = require('../controller/post-controller');

router.get('/profile', userController.profile);
router.get('/post', postController.post);
router.get('/SignUp', userController.SignUp);
router.get('/SignIn' , userController.SignIn);
router.post('/create', userController.create);

module.exports = router;