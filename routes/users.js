const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');

router.route('/').get(getAllUsers);

module.exports = router;
