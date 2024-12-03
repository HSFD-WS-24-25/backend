const swaggerJsdoc = require('swagger-jsdoc');

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
        url: 'http://localhost:3001/api', // Replace with server URL
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string", format: "email" },
            username: { type: "string" },
            first_name: { type: "string" },
            last_name: { type: "string" },
            telephone: { type: "string", nullable: true },
            address: { type: "string", nullable: true },
          },
          required: ["email", "username", "first_name", "last_name", "group_id"],
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
            max_additional_guests: { type: "integer" },
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
  apis: ['./routes/api/*.js', './controllers/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
