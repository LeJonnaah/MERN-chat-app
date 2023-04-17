const express = require('express');
const { registerUser } = require('../controllers/userControllers.js');
const { authUser } = require('../controllers/userControllers.js');

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login', authUser);

module.exports = router;