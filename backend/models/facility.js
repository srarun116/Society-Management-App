const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date : { type: Date, required: true },
    remindBefore: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Facility', FacilitySchema);
