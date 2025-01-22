const express = require('express');
const router = express.Router();
const { getAllUsers, editUser } = require('../../controllers/userController');
const logToken  = require('../../middleware/logTokenMiddleware');
const checkPermission = require('../../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../../config/permissions');

router.get('/', checkPermission(PERMISSIONS.VIEW_ALL_USERS), getAllUsers);
router.put('/edituser/:id', editUser);

module.exports = router;