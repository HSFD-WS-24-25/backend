const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const apiRoutes = require('./routes/api/index');
const { PORT } = require('./config/constants');
const port = process.env.PORT || PORT;

// Enable CORS everywhere
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Define all api routes in routes/api and import them in routes/api/index.js
app.use('/api', apiRoutes);

// Add Swagger UI 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

console.log(`Swagger at http://localhost:${port}/api-docs`);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});