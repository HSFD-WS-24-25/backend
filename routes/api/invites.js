const express = require('express');
const router = express.Router();
const { getEvent, participateEvent, listAllGuestEvents } = require('../../controllers/inviteController');

router.get('/:inviteID', getEvent);
//To Participate, the Buttons send a POST request
router.post('/:inviteID', participateEvent);
//To Authenticate, add email then get all events you are invited to
router.post('/:inviteID/auth', listAllGuestEvents);


module.exports = router;