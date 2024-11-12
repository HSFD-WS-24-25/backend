const express = require('express');
const app = express();
const userRouter = require('./routes/user');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRouter);

// Default routes
app.get('/', (req, res) => {
  res.send('Welcome. Available routes: /api/user');
});

app.get('/api', (req, res) => {
  res.send('Welcome to the API. Available routes: /api/user');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});