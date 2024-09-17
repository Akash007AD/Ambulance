const User = require('../models/user');
const AmbulanceDriver = require('../models/AmbulanceDriver');
const { verifyOtp } = require('../utils/otpService');

// Register or Login User with OTP
exports.registerOrLoginUser = async (req, res) => {
    const { phoneNumber, otp, name, latitude, longitude } = req.body;

    if (!verifyOtp(phoneNumber, otp)) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    let user = await User.findOne({ phoneNumber });
    if (!user) {
        user = new User({ phoneNumber, name, latitude, longitude });
        await user.save();
    }

    req.session.userId = user._id;
    res.status(200).json({ message: 'User logged in', user });
};

// Register or Login Ambulance Driver with OTP
exports.registerOrLoginDriver = async (req, res) => {
    const { phoneNumber, otp, name, latitude, longitude } = req.body;

    if (!verifyOtp(phoneNumber, otp)) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    let driver = await AmbulanceDriver.findOne({ phoneNumber });
    if (!driver) {
        driver = new AmbulanceDriver({ phoneNumber, name, latitude, longitude });
        await driver.save();
    }

    req.session.driverId = driver._id;
    res.status(200).json({ message: 'Driver logged in', driver });
};

// Logout User or Driver
exports.logout = (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logged out successfully' });
};
