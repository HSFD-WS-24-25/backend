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
        const roleId = (0 === usersCount) ? ROLES.ADMIN_INSTANCE.id : ROLES.GUEST.id;

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

const getUserById = async (id = null) => {
    if (!id) {
        console.error('No id provided to get user');
        return null;
    }
    try {
        return await prisma.user.findUnique({
            where: { id },
        });
    } catch (error) {
        console.error('Error checking if user exists:', error);
    }
    return null;
}


// function to update user information assumes frontend has id 
const editUser = async (req, res) => {

    //get id from req params
    const id = req.params.id;
    if (!id) {
        console.error('No id provided to update user');
        return null;
    }
    // Collect data from request body
    // if data is saved in the frontend as an object, we can just pass the object 
    const data = {
        email: req.body.email,
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        telephone: req.body.telephone,
        address: req.body.address
    };
    // if data is saved as json string, we can parse it

    // need to get user by id *******
    try {
        const user = await getUserById(id);

        if (!user) {
            console.error('User not found');
            return null;
        }

        // Collect updates
        const updates = {};
        for (const [key, value] of Object.entries(data)) {
            if (value !== null) {
                updates[key] = value; // Add non-null fields to updates
            }
        }

        if (Object.keys(updates).length === 0) {
            console.log('No updates to apply');
            return user; // Return the original user if no changes are made
        }

        // Persist changes to the database
        const updatedUser = await prisma.user.update({
            where: { id },
            data: updates,
        });

        console.log('User updated successfully');
        next();
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        next();
        return null;
    }
};

// get id based on sub
const subToId = async (sub) => {
    try {
        const user = await prisma.user.findUnique({
            where: { sub },
        });
        return user.id;
    } catch (error) {
        console.error('Error checking if user exists:', error);
    }
    return null;
}

// get the users information based on the sub
const getSelf = async (req, res) => {



}


module.exports = { getAllUsers, createAndGetUser, getUser };
