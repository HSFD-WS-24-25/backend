const jwt = require('jsonwebtoken');

//this function logs the token for debugging purposes
const logToken = (req, res, next) => {
  console.log('logging token');
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = jwt.decode(token);
      console.log('Decoded Token:', decodedToken);
      return token;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } else {
    console.log('No Authorization header found');
  }
  next();

};

module.exports = logToken;