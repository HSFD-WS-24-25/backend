const { PERMISSIONS } = require('./permissions');


// This file defines roles with unique IDs, names, descriptions, and associated permissions.
// TODO: Add more roles for none guests.

module.exports = {
    ROLES: {
        ADMIN_INSTANCE: {
            id: 1,
            name: 'admin_instance',
            description: 'Full access to all system resources and settings.',
            permissions: [
                PERMISSIONS.CREATE_EVENT,
                PERMISSIONS.CREATE_ORGANIZATION,
                PERMISSIONS.DELETE_EVENT,
                PERMISSIONS.DELETE_ORGANIZATION,
                PERMISSIONS.EDIT_EVENT,
                PERMISSIONS.EDIT_ORGANIZATION,
                PERMISSIONS.INVITE_USER,
                PERMISSIONS.VIEW_ALL_EVENTS,
            ],
        },
        ADMIN_ORGANIZATION: {
            id: 2,
            name: 'admin_organization',
            description: 'Manages organization-specific resources and settings.',
            permissions: [
                PERMISSIONS.CREATE_EVENT,
                PERMISSIONS.DELETE_EVENT,
                PERMISSIONS.EDIT_EVENT,
                PERMISSIONS.INVITE_USER,
                PERMISSIONS.VIEW_ALL_EVENTS,
            ],
        },
        ORGANIZER: {
            id: 3,
            name: 'organizer',
            description: 'Manages events they have created.',
            permissions: [
                PERMISSIONS.CREATE_EVENT,
                PERMISSIONS.EDIT_EVENT,
                PERMISSIONS.DELETE_EVENT,
                PERMISSIONS.VIEW_CREATED_EVENTS,
                PERMISSIONS.INVITE_USER,
            ],
        },
        GUEST: {
            id: 4,
            name: 'guest',
            description: 'Limited access to view and participate in invited events.',
            permissions: [
                PERMISSIONS.VIEW_INVITED_EVENTS,
            ],
        },
    },
};
