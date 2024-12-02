const { auth } = require('express-oauth2-jwt-bearer');
const { extractAndDecodeToken, getSub, getName, getEmail } = require('../helpers/authHelper');
const prisma = require('../config/database/prisma');

const checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

const saveUserToDatabase = async (req, res, next) => {
    console.log('Saving user to database');
    const user = await getUserData(req);
    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: user.id },
        });

        if (existingUser) {
            console.log('User already exists in the database');
            return next();
        }

        await prisma.user.create({
            data: user,
        });
        next();
    } catch (error) {
        console.error('Error saving user to database:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

async function getUserData(req) {
    const decodedToken = await extractAndDecodeToken(req);
    const id = await getSub(decodedToken);
    const username = 'johnsnow1234ffgdsf';
    const first_name = 'John';
    const last_name = 'Snow';
    const email = 'john@snow.com2ff';
    const role_id = 1;
    return {
        id,
        username,
        first_name,
        last_name,
        email,
        role_id,
    };
}

module.exports = { checkJwt, saveUserToDatabase };