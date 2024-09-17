const mongoose = require('mongoose');
const User = require('../models/user'); // Ensure this path is correct based on your project structure
const { sendOtp, verifyOtp, clearOtp } = require('../utils/otpService'); // OTP service functions

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, phoneNumber } = req.body;

    // Validate input
    if (!name || !phoneNumber) {
        return res.status(400).json({ message: 'Name and phone number are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ name, phoneNumber });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
};

// OTP Login (send OTP to user's phone number)
exports.otpLogin = async (req, res) => {
    const { phoneNumber } = req.body;

    // Validate input
    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }

    try {
        // Send OTP to the user
        await sendOtp(phoneNumber);

        res.status(200).json({ message: 'OTP sent successfully to ' + phoneNumber });
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
};

// Verify OTP and log the user in
exports.verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    // Validate input
    if (!phoneNumber || !otp) {
        return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    try {
        // Verify OTP
        const isVerified = verifyOtp(phoneNumber, otp);

        if (isVerified) {
            // OTP verified successfully, proceed to login
            // Optionally, check if the user exists or register them automatically
            let user = await User.findOne({ phoneNumber });
            if (!user) {
                user = new User({ phoneNumber });
                await user.save();
            }

            // Clear OTP after successful verification
            clearOtp(phoneNumber);

            // Return successful login response
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error.message);
        res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
    }
};

// Update user location
exports.updateLocation = async (req, res) => {
    const { phoneNumber, latitude, longitude } = req.body;

    // Validate input
    if (!phoneNumber || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ message: 'Phone number, latitude, and longitude are required' });
    }

    try {
        // Find user and update location
        const user = await User.findOneAndUpdate(
            { phoneNumber },
            { latitude, longitude },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Location updated successfully', user });
    } catch (error) {
        console.error('Error updating location:', error.message);
        res.status(500).json({ message: 'Failed to update location', error: error.message });
    }
};

// Logout the user (for session-based authentication)
exports.logout = async (req, res) => {
    // Assuming you are using sessions for authentication
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err.message);
            return res.status(500).json({ message: 'Failed to logout', error: err.message });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

// // Export all controllers
// module.exports = {
//     registerUser,
//     otpLogin,
//     verifyOtp,
//     updateLocation,
//     logout
// };
