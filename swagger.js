const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { DEFAULT_PORT } = require('./config/constants');
require('dotenv').config();

// Set up the Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Define the OpenAPI version
    info: {
      title: 'My API', // API title
      version: '1.0.0', // API version
      description: 'API documentation for my Express app', // Description of the API
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || DEFAULT_PORT}`, // Server URL (change to your actual server URL)
      },
    ],
  },
  // Path to the API docs
  apis: ['./routes/*.js'], // Path to your route files with JSDoc comments (you can adjust this)
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
