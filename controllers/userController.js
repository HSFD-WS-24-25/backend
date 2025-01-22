const prisma = require('../config/database/prisma');
const { ROLES } = require('../config/roles');
const checkPermission = require('../middleware/permissionMiddleware');

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

// need function to check permission of the user

// function to update user information assumes frontend has id 
const updateUser = async (req, res) => {
    try {
        // Get ID from req params
        const id = req.params.id;

        if (!id) {
            console.error('No id provided to update user');
            return res.status(400).json({ error: 'No id provided to update user' });
        }

        // Check if user exists in the DB
        const user = await getUserById(id);
        if (!user) {
            console.error('User not found');
            return res.status(400).json({ error: 'User not found' });
        }

        // Check if user has the right to update this information (self or admin)
        if (!isSelf(user.sub, id)) {
            try {
                const permission = await prisma.user.findUnique({
                    where: { sub: req.sub },
                    include: { roles: true },
                });

                if (!permission || !permission.roles.some(role => role.id <= 1)) {
                    console.error('User does not have the rights to update information');
                    return res.status(400).json({ error: 'User does not have rights to update information' });
                }
            } catch (error) {
                console.error('Error checking user permissions:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }

        // Data to be updated
        const data = {
            email: req.body?.email || req.body?.formData?.email || null,
            username: req.body?.username || req.body?.formData?.username || null,
            first_name: req.body?.first_name || req.body?.formData?.first_name || null,
            last_name: req.body?.last_name || req.body?.formData?.last_name || null,
            telephone: req.body?.telephone || req.body?.formData?.telephone || null,
            address: req.body?.address || req.body?.formData?.address || null,
        };

        // Define the expected types for each field
        const fieldDefinitions = {
            email: { type: 'string', maxLength: 255 },
            username: { type: 'string', maxLength: 50 },
            first_name: { type: 'string', maxLength: 50 },
            last_name: { type: 'string', maxLength: 50 },
            telephone: { type: 'string', maxLength: 20 },
            address: { type: 'string', maxLength: 255 },
        };

        // Validate the data types and lengths
        for (const [key, value] of Object.entries(data)) {
            if (value !== null) {
                if (typeof value !== fieldDefinitions[key].type) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid type for field ${key}. Expected ${fieldDefinitions[key].type}, but received ${typeof value}`,
                    });
                } else if (value.length > fieldDefinitions[key].maxLength) {
                    return res.status(400).json({
                        success: false,
                        message: `Field ${key} exceeds maximum length of ${fieldDefinitions[key].maxLength}`,
                    });
                }
            }
        }

        // Check uniqueness for email and username
        if (data.email != null) {
            const existingEmailUser = await prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingEmailUser && existingEmailUser.id !== id) {
                console.error('Email is already in use');
                return res.status(400).json({ error: 'Email is already in use' });
            }
        }
        if (data.username != null) {
            const existingUsernameUser = await prisma.user.findUnique({
                where: { username: data.username },
            });
            if (existingUsernameUser && existingUsernameUser.id !== id) {
                console.error('Username is already in use');
                return res.status(400).json({ error: 'Username is already in use' });
            }
        }

        // Persist changes to the database
        const updatedUser = await prisma.user.update({
            where: { id },
            data: data,  // Use 'data' here
        });

        console.log('User updated successfully');
        return res.status(200).json({ success: true, message: 'User updated successfully' });

    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


    // get id based on sub
    const getId = async (sub) => {
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
    // simple function to ensure that the user has the right to alte information
    const isSelf = async (sub, id) => {
        try {
            const user = await prisma.user.findUnique({
                where: { sub },
            });
            if (user.id === id) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error checking if user exists:', error);
        }
        return null;
    }


    module.exports = { getAllUsers, createAndGetUser, getUser, updateUser };
