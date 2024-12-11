const express = require('express');
const router = express.Router();

const { getAllEvents, createEvent, updateEvent, deleteEvent, getEventById } = require('../../controllers/eventController');
const { validateEvent } = require('../../validators/eventValidator');
const handleValidationErrors = require('../../middleware/validationMiddleware');
const checkPermission = require('../../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../../config/permissions');

router.post('/', checkPermission(PERMISSIONS.CREATE_EVENT), validateEvent, handleValidationErrors, createEvent);
router.get('/', checkPermission(PERMISSIONS.VIEW_ALL_EVENTS), getAllEvents);
router.get('/:id', checkPermission(PERMISSIONS.VIEW_ALL_EVENTS, PERMISSIONS.VIEW_CREATED_EVENTS, PERMISSIONS.VIEW_INVITED_EVENTS), getEventById);
router.put('/:id', checkPermission(PERMISSIONS.EDIT_EVENT), validateEvent, updateEvent, handleValidationErrors);
router.delete('/:id', checkPermission(PERMISSIONS.DELETE_EVENT), deleteEvent);

module.exports = router;
