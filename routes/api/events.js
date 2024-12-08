const express = require('express');
const router = express.Router();

const { getAllEvents, createEvent, updateEvent, deleteEvent, getEventById } = require('../../controllers/eventController');
const { validateEvent } = require('../../validators/eventValidator');
const handleValidationErrors = require('../../middleware/validationMiddleware');
const checkPermission = require('../../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../../config/permissions');

router.post('/', validateEvent, handleValidationErrors, createEvent);
router.get('/', checkPermission(PERMISSIONS.VIEW_ALL), getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;