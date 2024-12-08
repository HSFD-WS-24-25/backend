require('dotenv').config(); 
const swaggerJsdoc = require('swagger-jsdoc');
const appUrl = process.env.APP_URL ? `${process.env.APP_URL}/api` : 'http://localhost:3001/api';

// https://editor.swagger.io/
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Organizer: API Documentation/Test',
      version: '1.0.0',
      description: 'This is a sample Event Organizer Server based on the OpenAPI 3.0 specification.',
      externalDocs: {
        description: 'Find out more about Event Organizer',
        url: 'https://github.com/HSFD-WS-24-25/backend/blob/main/README.md',
      },
      
    },
    servers: [
      {
        url: appUrl,
      },
    ],
    components: {
      schemas: {
        Role: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            users: {
              type: 'array',
              items: { $ref: '#/components/schemas/User' },
            },
            permissions: {
              type: 'array',
              items: { $ref: '#/components/schemas/Permission' },
            },
          },
          required: ['id', 'name', 'description'],
        },
        Permission: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            roles: {
              type: 'array',
              items: { $ref: '#/components/schemas/Role' },
            },
          },
          required: ['id', 'name'],
        },
        Participant: {
          type: 'object',
          properties: {
            event_id: { type: 'integer' },
            user_id: { type: 'string', format: 'uuid' },
            status: { type: 'string', nullable: true },
            additional_guest: { type: 'integer', default: 0 },
            user: { $ref: '#/components/schemas/User' },
            event: { $ref: '#/components/schemas/Event' },
          },
          required: ['event_id', 'user_id'],
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: 'uuid' },
            sub: { type: 'string' },
            email: { type: "string", format: "email", nullable: true },
            username: { type: "string", nullable: true },
            first_name: { type: "string", nullable: true },
            last_name: { type: "string", nullable: true },
            telephone: { type: "string", nullable: true },
            address: { type: "string", nullable: true },
            role_id: { type: 'integer' },
            role: { $ref: '#/components/schemas/Role' },
          },
          required: ['id', 'sub', 'role_id'],
        },
        Event: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            date_start: { type: "string", format: "date-time" },
            date_end: { type: "string", format: "date-time" },
            location: { type: "string" },
            capacity: { type: "integer" },
            reminder: { type: "integer" },
            max_additional_guests: { type: "integer", default: 0 },
            participants: {
              type: "array",
              items: { $ref: '#/components/schemas/Participant' },
            },
          },
          required: [
            "name",
            "description",
            "date_start",
            "date_end",
            "location",
            "capacity",
            "reminder",
          ],
        },
      },
    },
  },
  apis: ['./swagger.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;

// Swagger API Samples
// https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date_start:
 *                 type: string
 *                 format: date-time
 *               date_end:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               reminder:
 *                 type: integer
 *               max_additional_guests:
 *                 type: integer
 *                 default: 0
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve a list of events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the event to retrieve
 *     responses:
 *       200:
 *         description: Event details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an existing event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date_start:
 *                 type: string
 *                 format: date-time
 *               date_end:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               reminder:
 *                 type: integer
 *               max_additional_guests:
 *                 type: integer
 *                 default: 0
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the event to delete
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal Server Error
 */
