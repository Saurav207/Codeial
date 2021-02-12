const express = require('express');

const router = express.Router(); 
const postApi = require('../../../controller/api/v2/post_api2');

router.get('/', postApi.index);

module.exports = router;