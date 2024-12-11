const express = require('express');
const router = express.Router();

const { getAllOrganizations, getOrganizationById, createOrganization, updateOrganization, deleteOrganization } = require('../../controllers/organizationController');
const handleValidationErrors = require('../../middleware/validationMiddleware');
const checkPermission = require('../../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../../config/permissions');

router.get('/', checkPermission(PERMISSIONS.VIEW_ALL_ORGANIZATION), getAllOrganizations, handleValidationErrors);
router.get('/:id',checkPermission(PERMISSIONS.VIEW_INVITED_ORGANIZATIONS), getOrganizationById);
router.post('/',checkPermission(PERMISSIONS.CREATE_ORGANIZATION), createOrganization);
router.put('/:id',checkPermission(PERMISSIONS.EDIT_ORGANIZATION), updateOrganization, handleValidationErrors);
router.delete('/:id',checkPermission(PERMISSIONS.DELETE_ORGANIZATION), deleteOrganization);

module.exports = router;
