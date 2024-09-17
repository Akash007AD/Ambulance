const express = require('express');
const router = express.Router();
const ambulanceController = require('../controllers/ambulanceController');

router.post('/find-nearby', ambulanceController.findNearbyAmbulances);
router.post('/book', ambulanceController.bookAmbulance);

module.exports = router;
