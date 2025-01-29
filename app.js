const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger/swagger');
const apiRoutes = require('./routes/api/index');
const apiInvite = require('./routes/api/invites');
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

// Use invite route without Authentication:
// We will use an encrypted string (token) consisting of:
// event_id + user_id + creation_date_invitation (+ validity + secret)
// this token can only be decrypted by the backend
// The token will be sent to the user via email 
// and will be used to authenticate the user
// IMPORTANT: This needs to be in front of /api routes, otherwise it will not work
app.use('/api/invite', apiInvite);

// Define all api routes in routes/api and import them in routes/api/index.js
app.use('/api', checkJwt, checkUserInDatabase, apiRoutes);

// Add Swagger UI 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

console.log(`Swagger at http://localhost:${port}/api-docs`);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});