const mongoose = require('mongoose');

const securityGuardSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    selectShift: { type: String, enum: ['day', 'night'], required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    aadhaarCard: { type: String } 
});

module.exports = mongoose.model('SecurityGuard', securityGuardSchema);
