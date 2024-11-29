const express = require('express');
const router = express.Router();
const eventRoutes = require('./events');
const userRoutes = require('./users');
const checkJwt = require('../../middleware/authMiddleware');

router.use('/events', eventRoutes);
router.use('/users', checkJwt, userRoutes);


module.exports = router;
