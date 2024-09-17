const { sendOtp, verifyOtp, clearOtp } = require('../utils/otpService');

// Send OTP to user
exports.sendOtpToUser = async (req, res) => {
    const { phoneNumber } = req.body;

    // Validate input
    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }

    try {
        // Generate and send OTP
        await sendOtp(phoneNumber);

        // Optional: Log OTP for debugging (remove this in production)
        console.log(`OTP sent to ${phoneNumber}`);

        // Return success response
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        // Handle any errors during OTP sending
        console.error('Error sending OTP:', error.message);
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
};

// Verify OTP
exports.verifyOtpForUser = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    // Validate input
    if (!phoneNumber || !otp) {
        return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    try {
        // Verify OTP
        const isVerified = verifyOtp(phoneNumber, otp);

        if (isVerified) {
            // Clear OTP after successful verification
            clearOtp(phoneNumber);
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            // If OTP is invalid
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        // Handle any errors during OTP verification
        console.error('Error verifying OTP:', error.message);
        res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
    }
};
