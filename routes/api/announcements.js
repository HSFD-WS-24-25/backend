const express = require('express');
const router = express.Router();
const { getAllAnnouncements, createAnnouncement} = require('../../controllers/announcementController');

router.get('/', getAllAnnouncements);
router.post('/', createAnnouncement);

module.exports = router;