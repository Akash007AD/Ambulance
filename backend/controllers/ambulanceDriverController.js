const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AmbulanceDriver = require('../models/AmbulanceDriver');
const { sendOtp, verifyOtp, clearOtp } = require('../utils/otpService'); // Ensure this is the correct path

// Login an ambulance driver
exports.loginDriver = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    try {
        // Verify OTP
        const isVerified = verifyOtp(phoneNumber, otp);
        if (!isVerified) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Find the driver by phone number
        const driver = await AmbulanceDriver.findOne({ phoneNumber });
        if (!driver) {
            return res.status(400).json({ message: 'Driver not found' });
        }

        // Create a token
        const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Clear OTP after successful verification
        clearOtp(phoneNumber);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in driver:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Register a new ambulance driver
exports.registerDriver = async (req, res) => {
    const { name, phoneNumber, password, latitude, longitude } = req.body;

    // Validate input
    if (!name || !phoneNumber || !password) {
        return res.status(400).json({ message: 'Name, phone number, and password are required' });
    }

    try {
        // Check if the driver already exists
        const existingDriver = await AmbulanceDriver.findOne({ phoneNumber });
        if (existingDriver) {
            return res.status(400).json({ message: 'Driver already exists' });
        }

        // Send OTP to the phone number
        await sendOtp(phoneNumber);

        // Store the driver's details temporarily until OTP is verified
        // (You may want to store this in a cache or database temporarily)

        res.status(200).json({ message: 'OTP sent successfully. Please verify to complete registration.' });
    } catch (error) {
        console.error('Error registering driver:', error);
        res.status(500).json({ message: 'Error registering driver', error: error.message });
    }
};

// Verify OTP for registration
exports.verifyRegistrationOtp = async (req, res) => {
    const { phoneNumber, otp, name, password, latitude, longitude } = req.body;

    try {
        // Verify OTP
        const isVerified = verifyOtp(phoneNumber, otp);
        if (!isVerified) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Create a new driver
        const driver = new AmbulanceDriver({
            name,
            phoneNumber,
            password, // Save the raw password, will hash in the pre-save hook
            latitude,
            longitude
        });

        await driver.save();
        clearOtp(phoneNumber); // Clear OTP after successful verification
        res.status(201).json({ message: 'Driver registered successfully' });
    } catch (error) {
        console.error('Error verifying OTP and registering driver:', error);
        res.status(500).json({ message: 'Error registering driver', error: error.message });
    }
};
