const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Get user profile
router.get('/', protect, getUserProfile);

// Update user profile
router.put('/', protect, updateUserProfile);

module.exports = router;
