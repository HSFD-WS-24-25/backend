const express = require('express');
const router = express.Router();
const { getEvent } = require('../../controllers/inviteController');

router.get('/:inviteID', getEvent);

module.exports = router;