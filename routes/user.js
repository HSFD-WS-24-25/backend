const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/user/profileController');

router.get('/', getProfile);

module.exports = router;
