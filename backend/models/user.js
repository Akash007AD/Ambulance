const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
});

module.exports = mongoose.model('User', userSchema);
