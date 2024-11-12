const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

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