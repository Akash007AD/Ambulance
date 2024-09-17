const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct based on your project structure

// Route for registering a new user
router.post('/register', userController.registerUser);

// Route for sending OTP to user's phone number for login
router.post('/login/otp', userController.otpLogin);

// Route for verifying OTP and logging the user in
router.post('/login/otp/verify', userController.verifyOtp);

// Route for updating user location
router.post('/location/update', userController.updateLocation);

// Route for logging out the user
router.post('/logout', userController.logout);

module.exports = router;
