const express = require('express');
const router = express.Router();
const {  getAllUsers, createAndGetUser, getUser  } = require('../../controllers/userController');
const logToken  = require('../../middleware/logTokenMiddleware');
const checkPermissions = require('../../middleware/permissionMiddleware');

router.route('/').get(getAllUsers);
// router.route('/create').post(logToken, createAndGetUser);
// router.route('/check').get(logToken, getUser);

module.exports = router;
