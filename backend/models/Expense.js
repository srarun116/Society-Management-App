
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    billFormat: { type: String, required: true }, // Stores the filename of the uploaded file
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);