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

const createUser = async (sub = null) => {
    if (!sub) {
        console.error('No sub provided to createUser');
    }
    try {
        await prisma.user.create({
            data: {
                sub: sub,
                role_id: ROLES.GUEST.id,
            },
        });
    } catch (error) {
        console.error('Error saving user to database:', error);
    }
}

const doesUserExist = async (sub = null) => {
    if (!sub) {
        console.error('No sub provided to doesUserExist');
        return false;
    }
    try {
        const countUserExists = await prisma.user.count({
            where: { sub },
        });
        return countUserExists > 0;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        return false;
    }
}

module.exports = { getAllUsers, createUser, doesUserExist };
