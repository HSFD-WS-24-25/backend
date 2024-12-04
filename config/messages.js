module.exports = {
    // Success Messages
    SUCCESS: {
        USER_CREATED: 'User successfully created.',
        USER_UPDATED: 'User successfully updated.',
        USER_DELETED: 'User successfully deleted.',
        PERMISSION_GRANTED: 'Permission successfully granted.',
    },

    // Error Messages
    ERROR: {
        USER_NOT_FOUND: 'User not found.',
        INVALID_CREDENTIALS: 'Invalid credentials. Please try again.',
        UNAUTHORIZED_ACCESS: 'You are not authorized to access this resource.',
        MISSING_FIELDS: 'Required fields are missing.',
        INVALID_INPUT: 'Invalid input provided.',
        SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
        ROLE_NOT_FOUND: 'Role not found.',
        PERMISSION_DENIED: 'You do not have permission to perform this action.',
    },

    // Validation Messages
    VALIDATION: {
        EMAIL_REQUIRED: 'Email address is required.',
    },

    // Status-Code Messages
    STATUS: {
        OK: 'Successful',
        CREATED: 'Created',
        BAD_REQUEST: 'Bad Request',
        UNAUTHORIZED: 'Unauthorized user',
        FORBIDDEN: 'Forbidden: You do not have the required permission.',
        NOT_FOUND: 'Not Found',
        INTERNAL_SERVER_ERROR: 'Internal Server Error',
        SERVICE_UNAVAILABLE: 'Service Unavailable',
    },

    // General Messages
    GENERAL: {
        INVALID_TOKEN: 'Invalid token provided.',
        UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again later.',
    },
};
