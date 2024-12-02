

const express = require("express");
const router = express.Router();
const {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    viewExpense,
} = require("../controllers/expenseController");
const upload = require("../middlewares/fileUpload");
const { protect, isAdmin } = require('../middlewares/authMiddleware');


// Routes
router.post("/", protect, isAdmin, upload.single("billFormat"), createExpense); // Upload file on creation
router.put("/update/:id", protect, isAdmin, upload.single("billFormat"), updateExpense); // Upload file on update
router.get("/", protect, isAdmin, getExpenses);
router.delete("/delete/:id", protect, isAdmin, deleteExpense);
router.get("/:id", protect, isAdmin, viewExpense);

module.exports = router;

