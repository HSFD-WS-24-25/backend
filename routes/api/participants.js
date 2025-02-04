const express = require('express');
const router = express.Router();

const {  inviteGuests, getAllInvitedGuests  } = require('../../controllers/inviteEventGuestController');

router.get('/:eventID', getAllInvitedGuests);
router.post('/:eventID', inviteGuests);

module.exports = router;