const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ambulanceDriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Add password field
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
});

// Hash password before saving
ambulanceDriverSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('AmbulanceDriver', ambulanceDriverSchema);
