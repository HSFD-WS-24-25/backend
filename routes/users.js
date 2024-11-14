/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Get an example response
 *     responses:
 *       200:
 *         description: A mocked response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: This is a mocked response
 */

const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');

router.route('/').get(getAllUsers);

module.exports = router;
