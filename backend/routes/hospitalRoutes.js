const express = require('express');
const { findNearbyHospitals, updateBedAvailability } = require('../controllers/hospitalController');
const router = express.Router();

// Find nearby hospitals with available beds
router.post('/find', findNearbyHospitals);

// Update bed availability
router.post('/update', updateBedAvailability);

module.exports = router;
