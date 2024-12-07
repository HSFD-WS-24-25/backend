const { auth } = require('express-oauth2-jwt-bearer');
const { getSub } = require('../helpers/authHelper');
const { createUser, doesUserExist } = require('../controllers/userController');

const checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

const checkUserInDatabase = async (req, res, next) => {
    const sub = await getSub(req);
    if (await doesUserExist(sub)) {
        console.log('User exists in the database');
        return next();
    }
    await createUser(sub);
    console.log('User created in the database');
    next();
};

module.exports = { checkJwt, checkUserInDatabase };