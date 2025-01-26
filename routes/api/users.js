const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require('../../controllers/userController');
const checkPermission = require('../../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../../config/permissions');
const { validateUserData } = require('../../validators/userValidator');
const handleValidationErrors = require('../../middleware/validationMiddleware');

router.get('/', checkPermission(PERMISSIONS.VIEW_ALL_USERS), getAllUsers);
router.put('/:id', validateUserData, handleValidationErrors, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;