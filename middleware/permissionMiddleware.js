const prisma = require('../config/database/prisma');
const { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../config/statusCodes');
const { STATUS } = require('../config/messages');
const { PERMISSIONS } = require('../config/permissions');
const { isValidPermission } = require('../utils');

const checkPermission = (requiredPermissions = PERMISSIONS.DEFAULT) => {
    return async (req, res, next) => {

        // Ensure requiredPermissions is always an array
        if (!Array.isArray(requiredPermissions)) {
            requiredPermissions = [requiredPermissions];
        }

        // Validate each permission in the array
        const invalidPermissions = requiredPermissions.filter(permission => !isValidPermission(permission));
        console.log('Invalid permissions:', invalidPermissions);
        if (invalidPermissions.length > 0) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'No valid permissions found' });
        }

        try {
            const user = req.user;
            console.log('User from permission:', user);

            if (!user) {
                return res.status(NOT_FOUND).json({ message: 'User not found' });
            }

            const role = await prisma.role.findUnique({
                where: { id: user.role_id },
                include: {
                    permissions: true,
                },
            });
            console.log('Role: ', role);

            if (!role?.permissions) {
                return res.status(FORBIDDEN).json({ message: STATUS.FORBIDDEN });
            }

            const userPermissions = role.permissions.map(permission => permission.id);
            console.log('User permissions:', userPermissions);

            // Check if any of the requiredPermissions are in the user's permissions
            const hasRequiredPermission = requiredPermissions.some(requiredPermission =>
                userPermissions.includes(requiredPermission.id)
            );

            if (!hasRequiredPermission) {
                return res.status(FORBIDDEN).json({ message: STATUS.FORBIDDEN });
            }

            return next();
        } catch (error) {
            console.error('Error checking permissions:', error);
            return res.status(INTERNAL_SERVER_ERROR).json({ message: STATUS.INTERNAL_SERVER_ERROR });
        }
    };
};

module.exports = checkPermission;