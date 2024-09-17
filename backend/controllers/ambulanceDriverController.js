const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AmbulanceDriver = require('../models/AmbulanceDriver');

// Login an ambulance driver
exports.loginDriver = async (req, res) => {
    const { phoneNumber, password } = req.body;
    console.log('Login attempt:', { phoneNumber, password });

    try {
        // Find the driver by phone number
        const driver = await AmbulanceDriver.findOne({ phoneNumber });
        if (!driver) {
            return res.status(400).json({ message: 'Driver not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, driver.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a token
        const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in driver:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};



// Register a new ambulance driver
exports.registerDriver = async (req, res) => {
    const { name, phoneNumber, password, latitude, longitude } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new driver
        const driver = new AmbulanceDriver({
            name,
            phoneNumber,
            password: hashedPassword, // Save the hashed password
            latitude,
            longitude
        });

        await driver.save();
        res.status(201).json({ message: 'Driver registered successfully' });
    } catch (error) {
        console.error('Error registering driver:', error);
        res.status(500).json({ message: 'Error registering driver', error: error.message });
    }
};
