const express = require('express');
const { registerOrLoginUser, registerOrLoginDriver, logout } = require('../controllers/authController');
const router = express.Router();

// User Registration or Login
router.post('/user', registerOrLoginUser);

// Ambulance Driver Registration or Login
router.post('/driver', registerOrLoginDriver);

// Logout
router.post('/logout', logout);

module.exports = router;
