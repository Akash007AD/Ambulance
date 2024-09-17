const Hospital = require('../models/hospital');

// Get the list of nearby hospitals with available beds
exports.findNearbyHospitals = async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Invalid location' });
    }

    try {
        const hospitals = await Hospital.find();
        const nearbyHospitals = hospitals.filter(hospital => {
            return hospital.availableBeds > 0;
        });

        res.status(200).json({ hospitals: nearbyHospitals });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hospitals', error });
    }
};

// Hospital updates its bed availability
exports.updateBedAvailability = async (req, res) => {
    const { hospitalId, availableBeds } = req.body;

    try {
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        hospital.availableBeds = availableBeds;
        await hospital.save();

        res.status(200).json({ message: 'Bed availability updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating beds', error });
    }
};
