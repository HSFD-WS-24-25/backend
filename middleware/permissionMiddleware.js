const { getSub, extractAndDecodeToken } = require('../helpers/authHelper');
const prisma = require('../config/database/prisma');
const { UNAUTHORIZED, FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../config/statusCodes');
const { STATUS } = require('../config/messages');
const { PERMISSIONS } = require('../config/permissions');
const { isValidPermission } = require('../utils');

const checkPermission = (requiredPermission = PERMISSIONS.DEFAULT) => {
    return async (req, res, next) => {
        if (!isValidPermission(requiredPermission)) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'No valid permission found' });
        }
        try {
            const userId = await getSub(await extractAndDecodeToken(req));
            if (!userId) {
                return res.status(UNAUTHORIZED).json({ message: STATUS.UNAUTHORIZED });
            }

            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    role: {
                        include: {
                            permissions: true,
                        },
                    },
                },
            });

            if (! user) {
                return res.status(NOT_FOUND).json({ message: 'User not found' });
            }

            if (! user.role?.permissions) {
                return res.status(FORBIDDEN).json({ message: STATUS.FORBIDDEN });
            }

            const userPermissions = user.role.permissions.map(permission => permission.id);
            if (! userPermissions.includes(requiredPermission.id)) {
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