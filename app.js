const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger/swagger');
const apiRoutes = require('./routes/api/index');
const { PORT } = require('./config/constants');
const { checkJwt, checkUserInDatabase } = require('./middleware/authMiddleware');
const port = process.env.PORT || PORT;

// Enable CORS only for the client URL specified in environment variables
// TODO: Do we need more options? (https://expressjs.com/en/resources/middleware/cors.html)
const corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));

// Enable JSON parsing
app.use(express.json());

// Define all api routes in routes/api and import them in routes/api/index.js
app.use('/api', checkJwt, checkUserInDatabase, apiRoutes);

// DeepL
const translateRoute = require("./routes/api/translate");
app.use("/api", translateRoute);

// Add Swagger UI 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

console.log(`Swagger at http://localhost:${port}/api-docs`);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});