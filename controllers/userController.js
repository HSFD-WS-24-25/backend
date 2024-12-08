const prisma = require('../config/database/prisma');
const { ROLES } = require('../config/roles');

// HTTP response methods
const getAllUsers = async (req, res) => {
    try {
        res.json(await prisma.user.findMany());
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Local methods
const createAndGetUser = async (sub = null) => {
    if (!sub) {
        console.error('No sub provided to createUser');
        return null;
    }
    try {
        const usersCount = await prisma.user.count();
        // If there are no users, the first user to sign in will be an admin, others will be guests
        const roleId = (0 === usersCount) ? ROLES.ADMIN_INSTANCE : ROLES.GUEST.id;

        const user = await prisma.user.create({
            data: {
                sub: sub,
                role_id: roleId,
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
        console.error('No sub provided to get user');
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
