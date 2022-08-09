const express = require('express');
const { loginUser, signUpUser } = require('../controllers/user.controller');

const router = express.Router();

// login route
router.post('/login', loginUser);

// sign up route
router.post('/signup', signUpUser);

module.exports = router;
