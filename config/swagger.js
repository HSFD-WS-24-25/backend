// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

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
  },
  apis: ['./routes/api/*.js', './controllers/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
