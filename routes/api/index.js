const express = require('express');
const router = express.Router();
const eventRoutes = require('./events');
const userRoutes = require('./users');
const organizationRoutes = require('./organizations');
const participants = require('./participants');

router.use('/organizations', organizationRoutes);
router.use('/events', eventRoutes);
router.use('/users', userRoutes);
router.use('/participants', participants);

module.exports = router;
