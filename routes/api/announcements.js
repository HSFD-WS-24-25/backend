const express = require('express');
const router = express.Router();
const { getAllAnnouncements, createAnnouncement, deleteAnnouncement, updateAnnouncement} = require('../../controllers/announcementController');

router.get('/', getAllAnnouncements);
router.post('/', createAnnouncement);
router.delete('/', deleteAnnouncement);
router.put('/', updateAnnouncement);

module.exports = router;