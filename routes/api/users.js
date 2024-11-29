const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUser, updateUser } = require('../../controllers/userController');
const checkJwt = require('../../middleware/authMiddleware'); // JWT-Middleware importieren

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   username:
 *                     type: string
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   telephone:
 *                     type: string
 *                     nullable: true
 *                   address:
 *                     type: string
 *                     nullable: true
 *                   group_id:
 *                     type: integer
 */
router.route('/').get( checkJwt, getAllUsers); // GET /users mit JWT-Validierung

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               telephone:
 *                 type: string
 *                 nullable: true
 *               address:
 *                 type: string
 *                 nullable: true
 *               group_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.route('/').post( createUser); // POST /users mit JWT-Validierung

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', deleteUser); // DELETE /users/:id mit JWT-Validierung

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               telephone:
 *                 type: string
 *                 nullable: true
 *               address:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateUser); // PUT /users/:id mit JWT-Validierung

module.exports = router;
