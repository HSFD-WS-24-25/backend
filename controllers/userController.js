const prisma = require('../config/database/prisma');
const { ROLES } = require('../config/roles');

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(require('../models/users.json'));
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const createAndGetUser = async (sub = null) => {
    if (!sub) {
        console.error('No sub provided to createUser');
        return null;
    }
    try {
        const user = await prisma.user.create({
            data: {
                sub: sub,
                role_id: ROLES.GUEST.id,
            },
        });
        console.log('User created:', user);
        return user;
    } catch (error) {
        console.error('Error saving user to database:', error);
    }
    return null;
}

const getUser = async (sub = null) => {
    if (!sub) {
        console.error('No sub provided to doesUserExist');
        return null;
    }
    try {
        return await prisma.user.findUnique({
            where: { sub },
        });
    } catch (error) {
        console.error('Error checking if user exists:', error);
    }
    return null;
}

module.exports = { getAllUsers, createAndGetUser, getUser };
