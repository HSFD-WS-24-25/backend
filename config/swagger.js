const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meeting Organization API',
      version: '1.0.0',
      description: 'API documentation for the meeting organization application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server',
      },
    ],
  },
  apis: ['./routes/users.js', './controllers/userController.js'], // Include files for endpoint documentation
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
