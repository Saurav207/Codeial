const express = require('express');

const router = express.Router();  //Route handler
 const homeController = require('../controller/home_controller');



router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/user', require('./user'));




module.exports = router;



