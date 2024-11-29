const express = require('express');
const router = express.Router();
const {addOtherIncome, getAllOtherIncome, getOtherIncomeById, updateOtherIncome, deleteOtherIncome} = require('../controllers/otherIncomeController');


router.post('/add',  addOtherIncome);
router.get('/',  getAllOtherIncome);
router.get('/:id',  getOtherIncomeById);
router.put('/:id', updateOtherIncome);
router.delete('/:id', deleteOtherIncome);

module.exports = router;
