const express = require('express');
const router = express.Router();
const {  getAllUsers, createAndGetUser, getUser  } = require('../../controllers/userController');
const logToken  = require('../../middleware/logTokenMiddleware');
const checkPermissions = require('../../middleware/permissionMiddleware');

router.get('/', checkPermission(PERMISSIONS.VIEW_ALL_EVENTS), getAllUsers);
// router.route('/create').post(logToken, createAndGetUser);
// router.route('/check').get(logToken, getUser);

module.exports = router;
