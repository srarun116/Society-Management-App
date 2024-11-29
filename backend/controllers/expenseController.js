const Expense = require('../models/Expense');
const path = require('path');
const fs = require('fs');

// Helper function to clean the file name
const cleanFileName = (fileName) => {
    // Remove numbers and hyphen at the start of the file name
    return fileName.replace(/^\d+-/, '');
};

// Create Expense
exports.createExpense = async (req, res) => {
    try {
        const { title, description, date, amount } = req.body;
        const billFile = req.file ? req.file.filename : null;

        if (!billFile) {
            return res.status(400).json({ error: "File is required." });
        }

          // Clean the file name before saving
          const cleanedFileName = cleanFileName(billFile);

        const expense = new Expense({
            title,
            description,
            date,
            amount,
            billFormat: cleanedFileName, // Save the filename
        });

        await expense.save();
        res.status(201).json({ message: "Expense created successfully", expense });
    } catch (error) {
        res.status(500).json({ error: "Failed to create expense" });
    }
};

// Get All Expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};

// Update Expense


exports.updateExpense = async (req, res) => {
    try {
        const { title, description, date, amount } = req.body;
        const billFile = req.file ? req.file.filename : null;

        const expenseData = { title, description, date, amount };

        if (billFile) {
            // Clean the file name before updating
            const cleanedFileName = cleanFileName(billFile);
            expenseData.billFormat = cleanedFileName; // Update the file with cleaned name
        }

        const expense = await Expense.findByIdAndUpdate(req.params.id, expenseData, { new: true });
        if (!expense) return res.status(404).json({ error: "Expense not found" });

        res.status(200).json({ message: "Expense updated successfully", expense });
    } catch (error) {
        res.status(500).json({ error: "Failed to update expense" });
    }
};


// Delete Expense
exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) return res.status(404).json({ error: 'Expense not found' });

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};

// View Single Expense
exports.viewExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ error: 'Expense not found' });

        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to view expense' });
    }
};
