const mongoose = require('mongoose');

const ambulanceDriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Add password field
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
});

module.exports = mongoose.model('AmbulanceDriver', ambulanceDriverSchema);
