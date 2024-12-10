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
      securitySchemes: {
        Auth0: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your Auth0 token to authorize requests.',
        },
      },
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
    paths: {
    },
  },
  apis: [],
};

const specs = swaggerJsdoc(options);
module.exports = specs;