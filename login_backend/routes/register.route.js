const express = require('express');
const router = express.Router();
const registerController = require('../controller/resgister.controller');

router.post('/api/auth/register',registerController);

module.exports = router;