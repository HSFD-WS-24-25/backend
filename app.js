const express = require('express');
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const { getAllUsers } = require('./controllers/userController');
require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const port = process.env.PORT || 3001;

// Enable CORS everywhere
app.use(cors());

// Add Swagger UI 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

console.log(`Swagger at http://localhost:${port}/api-docs`);

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'http://localhost:3001/api',
  issuerBaseURL: `https://dev-boc0av4c0bacnon6.us.auth0.com/`,
});

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

const users = require('./models/users.json');

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

app.get('/api/users', checkJwt, function(req, res) {
  res.json(users)
});

const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});