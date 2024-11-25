const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../../controllers/userController');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
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
 *                   participants:
 *                     type: array
 *                     items:
 *                       type: object
 *                   group:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 */

router.route('/').get(getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
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
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

// router.route('/').post(createUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
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
// router.delete('/:id', deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
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
// router.put('/:id', updateUser);

module.exports = router;
