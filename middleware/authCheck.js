// authCheck.js middleware
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://your-auth0-domain/.well-known/jwks.json`,
  }),
  audience: 'http://localhost:3001/api',
  issuer: `https://dev-boc0av4c0bacnon6.us.auth0.com/`,
  algorithms: ['RS256'],
});

module.exports = authCheck;