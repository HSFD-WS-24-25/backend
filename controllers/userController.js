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

    try {
        //get id from req params
        const id = req.params.id;
        if (!id) {
            console.error('No id provided to update user');
            res.status(400).json({ error: 'No id provided to update user' });
            return null;
        }
        //check if user exists in our DB
        const user = await getUserById(id);
        if (!user) {
            console.error('User not found');
            res.status(400).json({ error: 'user not found' });
            return null;
        }
        // check if user has the right to update this information
        else if (!isSelf(user.sub, id)) {
            console.error('User does not have the rights to update information');
            res.status(400).json({ error: 'user does not have rights to update information' });
            return null;
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }

    //save the data from the request: induvidual fields || formData object 
    const data = {
        email: req.body?.email || req.body?.formData?.email || null,
        username: req.body?.username || req.body?.formData?.username || null,
        first_name: req.body?.first_name || req.body?.formData?.first_name || null,
        last_name: req.body?.last_name || req.body?.formData?.last_name || null,
        telephone: req.body?.telephone || req.body?.formData?.telephone || null,
        address: req.body?.address || req.body?.formData?.address || null,
    };

 
    // Define the expected types for each field ** this is probaly not needed as the front end should handle this but just in case
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
                // set value to null to prevent it from being saved
                value = null;
            } else if (value.length > fieldDefinitions[key].maxLength) {
                return res.status(400).json({
                    success: false,
                    message: `Field ${key} exceeds maximum length of ${fieldDefinitions[key].maxLength}`,
                });
                // set value to null to prevent it from being saved
                value = null;
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

    try {
        
        // Persist changes to the database
        const updatedUser = await prisma.user.update({
            where: { id },
            data: updates,
        });

        console.log('User updated successfully');
        res.status(200).json({ success: true, message: 'User updated successfully' });  
        
        next();
    } catch (error) {
        console.error('Error updating user:', error);

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


module.exports = { getAllUsers, createAndGetUser, getUser };
