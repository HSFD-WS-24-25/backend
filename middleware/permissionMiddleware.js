const prisma = require('../config/database/prisma');
const { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../config/statusCodes');
const { STATUS } = require('../config/messages');
const { PERMISSIONS } = require('../config/permissions');
const { isValidPermission } = require('../utils');

const checkPermission = (requiredPermission = PERMISSIONS.DEFAULT) => {
    return async (req, res, next) => {
        if (!isValidPermission(requiredPermission)) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'No valid permission found' });
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
            if (!userPermissions.includes(requiredPermission.id)) {
                return res.status(FORBIDDEN).json({ message: STATUS.FORBIDDEN });
            }

            return next();
        } catch (error) {
            console.error('Error checking permissions:', error);
            return res.status(INTERNAL_SERVER_ERROR).json({ message: STATUS.INTERNAL_SERVER_ERROR });
        }
    };
}

module.exports = checkPermission;