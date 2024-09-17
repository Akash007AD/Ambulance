const Ambulance = require('../models/Ambulance');
const User = require('../models/user');
const geolib = require('geolib');

// Find nearby ambulances based on user location
exports.findNearbyAmbulances = async (req, res) => {
    const { userId, latitude, longitude } = req.body;
    
    if (!userId || !latitude || !longitude) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        const ambulances = await Ambulance.find({ available: true }).populate('driver');
        const nearbyAmbulances = ambulances.filter(ambulance => {
            return geolib.getDistance(
                { latitude: ambulance.location.latitude, longitude: ambulance.location.longitude },
                { latitude, longitude }
            ) <= 5000; // 5 km radius
        });

        res.status(200).json({ ambulances: nearbyAmbulances });
    } catch (error) {
        res.status(500).json({ message: 'Error finding ambulances', error });
    }
};

// Book an ambulance for a user
exports.bookAmbulance = async (req, res) => {
    const { userId, ambulanceId } = req.body;

    try {
        const user = await User.findById(userId);
        const ambulance = await Ambulance.findById(ambulanceId);

        if (!user || !ambulance || !ambulance.available) {
            return res.status(400).json({ message: 'Invalid booking request' });
        }

        ambulance.assignedUser = user._id;
        ambulance.available = false;
        await ambulance.save();

        res.status(200).json({ message: 'Ambulance booked successfully', ambulance });
    } catch (error) {
        res.status(500).json({ message: 'Error booking ambulance', error });
    }
};
