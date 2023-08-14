const express = require('express');
const router = express.Router();
const messageController = require('../controller/message.controller.js');

router.post('/api/user/message',messageController); 

module.exports = router;