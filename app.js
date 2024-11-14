const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const { swaggerDocs, swaggerUi } = require('./swagger');
const { DEFAULT_PORT } = require('./config/constants');
require('dotenv').config();

const port = process.env.PORT || DEFAULT_PORT;

// Middleware
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', usersRouter);

// Default routes
app.get('/', (req, res) => {
  res.send('Welcome. Available routes: /api/users');
});

app.get('/api', (req, res) => {
  res.send('Welcome to the API. Available routes: /api/users');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});