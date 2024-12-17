const express = require('express');
const router = express.Router();
const eventRoutes = require('./events');
const userRoutes = require('./users');
const organizationRoutes = require('./organizations');

router.use('/organizations', organizationRoutes);
router.use('/events', eventRoutes);
router.use('/users', userRoutes);

module.exports = router;
