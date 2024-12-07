const { auth } = require('express-oauth2-jwt-bearer');
const { getSub } = require('../helpers/authHelper');
const { createAndGetUser, getUser } = require('../controllers/userController');
const { STATUS } = require('../config/messages');
const { INTERNAL_SERVER_ERROR } = require('../config/statusCodes');

const checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

const checkUserInDatabase = async (req, res, next) => {
    try {
        const sub = await getSub(req);
        let user = await getUser(sub) || await createAndGetUser(sub)

        if (!user) {
            return res.status(INTERNAL_SERVER_ERROR).json({ error: STATUS.INTERNAL_SERVER_ERROR });
        }
        req.user = user;
        console.log('User:', req.user);
        next();
    } catch (error) {
        console.error('Error checking user in database:', error);
        return res.status(INTERNAL_SERVER_ERROR).json({ error: STATUS.INTERNAL_SERVER_ERROR });
    }
};

module.exports = { checkJwt, checkUserInDatabase };