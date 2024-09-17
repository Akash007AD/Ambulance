const axios = require('axios');

// Temporary in-memory OTP store; for production, consider using a database
const otpStore = {};

// Function to generate a 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Function to send OTP using Msg91
const sendOtp = async (phoneNumber) => {
    const otp = generateOtp();
    
    // Msg91 API parameters
    const msg91Options = {
        sender: process.env.MSG91_SENDER_ID, // Your Msg91 sender ID
        route: '4', // Transactional Route
        country: '+91', // Country code for India
        sms: [
            {
                message: `Your OTP code is ${otp}`,
                to: [phoneNumber]
            }
        ]
        
    };

    try {
        // Send the OTP using the Msg91 API
        const response = await axios({
            method: 'POST',
            url: `https://api.msg91.com/api/v5/sms`,
            headers: {
                'authkey': process.env.MSG91_AUTH_KEY, // Your Msg91 auth key
                'Content-Type': 'application/json'
            },
            data: msg91Options
        });

        // Store the OTP temporarily
        otpStore[phoneNumber] = otp;
        console.log(otp)
        return otp;
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        throw new Error('Failed to send OTP');
    }
};

// Function to verify OTP
const verifyOtp = (phoneNumber, otp) => {
    return otpStore[phoneNumber] === otp;
};

// Function to clear OTP after verification
const clearOtp = (phoneNumber) => {
    delete otpStore[phoneNumber];
};

module.exports = { sendOtp, verifyOtp, clearOtp };
