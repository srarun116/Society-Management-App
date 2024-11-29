const express = require('express');
const router = express.Router();
const {createAnnouncement, getAllAnnouncements, updateAnnouncement, getAnnouncementById, deleteAnnouncement} = require('../controllers/announcementController');

const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/',  createAnnouncement);
router.get('/',   getAllAnnouncements);
router.put('/:id',   updateAnnouncement);
router.get('/:id',  getAnnouncementById);
router.delete('/:id',  deleteAnnouncement);

module.exports = router;