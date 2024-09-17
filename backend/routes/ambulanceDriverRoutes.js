const express = require('express');
const router = express.Router();
const ambulanceDriverController = require('../controllers/ambulanceDriverController');

// Register a new ambulance driver
router.post('/register', ambulanceDriverController.registerDriver);

// Login an ambulance driver
router.post('/login', ambulanceDriverController.loginDriver);

module.exports = router;
