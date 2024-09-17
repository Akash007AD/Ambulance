const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        type: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        },
        required: true
    },
    availableBeds: { type: Number, required: true }
});

module.exports = mongoose.model('Hospital', hospitalSchema);
