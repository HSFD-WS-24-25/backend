const express = require('express');
const router = express.Router();
const { getAllParticipants, createParticipants } = require('../../controllers/participController');

router.get('/', getAllParticipants);
router.post('/:eventID', createParticipants);

module.exports = router;