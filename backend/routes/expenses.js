// const express = require('express');
// const router = express.Router();
// const {createExpense, getExpenses, updateExpense, deleteExpense, viewExpense}  = require('../controllers/expenseController');




// router.post('/',createExpense);
// router.get('/', getExpenses);
// router.put('/update/:id',  updateExpense);
// router.delete('/delete/:id', deleteExpense);
// router.get('/:id',  viewExpense);

// module.exports = router;

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


// Routes
router.post("/", upload.single("billFormat"), createExpense); // Upload file on creation
router.put("/update/:id", upload.single("billFormat"), updateExpense); // Upload file on update
router.get("/", getExpenses);
router.delete("/delete/:id", deleteExpense);
router.get("/:id", viewExpense);

module.exports = router;

