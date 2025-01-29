const express = require('express');
const router = express.Router();
const { getEvent, participateEvent, listAllGuestEvents } = require('../../controllers/inviteController');
const { validateGuest } = require('../../validators/guestValidator');
const { getAllInvitedGuests, inviteGuests } = require('../../controllers/inviteEventGuestController');
const handleValidationErrors = require('../../middleware/validationMiddleware');

// Specific routes
router.get('/event-guests', getAllInvitedGuests);
router.post('/event-guests', validateGuest, handleValidationErrors, inviteGuests);

// General routes
router.get('/:inviteID', getEvent);
//To Participate, the Buttons send a POST request
router.post('/:inviteID', participateEvent);
//To Authenticate, add email then get all events you are invited to
router.post('/:inviteID/auth', listAllGuestEvents);

module.exports = router;