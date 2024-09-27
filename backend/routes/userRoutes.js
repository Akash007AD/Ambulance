const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct

// User Registration
router.post('/register', userController.registerUser);

// OTP Login
router.post('/otp-login', userController.otpLogin);

// Verify OTP
router.post('/verify-otp', userController.verifyOtp);

// Update User Location
router.put('/update-location', userController.updateLocation);

// Logout
router.post('/logout', userController.logout);

// Export the router
module.exports = router;
