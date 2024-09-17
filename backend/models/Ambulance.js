const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AmbulanceDriver',
        required: true
    },
    location: {
        type: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        },
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    currentHospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        default: null
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

module.exports = mongoose.model('Ambulance', ambulanceSchema);
