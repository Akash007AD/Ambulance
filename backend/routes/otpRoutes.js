const express = require('express');
const { sendOtpToUser, verifyOtpForUser } = require('../controllers/otpController');
const router = express.Router();

// Send OTP
router.post('/send', sendOtpToUser);

// Verify OTP
router.post('/verify', verifyOtpForUser);

module.exports = router;
