/*
* Use this file to define the permissions for application.
* Each permission should have a unique id and name.
* Keys are in uppercase, with underscores for spaces, in alphabetical order.
*/

module.exports = {
    PERMISSIONS: {
        CREATE_EVENT: {
            id: 1,
            name: 'create_event'
        },
        CREATE_ORGANIZATION: {
            id: 2,
            name: 'create_organization'
        },
        DELETE_EVENT: {
            id: 3,
            name: 'delete_event'
        },
        DELETE_ORGANIZATION: {
            id: 4,
            name: 'delete_organization'
        },
        EDIT_EVENT: {
            id: 5,
            name: 'edit_event'
        },
        EDIT_ORGANIZATION: {
            id: 6,
            name: 'edit_organization'
        },
        INVITE_USER: {
            id: 7,
            name: 'invite_user'
        },
        VIEW_ALL_EVENTS: {
            id: 8,
            name: 'view_all_events'
        },
        VIEW_CREATED_EVENTS: {
            id: 9,
            name: 'view_created_events'
        },
        VIEW_INVITED_EVENTS: {
            id: 10,
            name: 'view_invited_events'
        },
        VIEW_ALL_USERS: { 
            id: 11,
            name: 'view_all_users'
        },
        DEFAULT: {
            id: 12,
            name: 'default_permission'
        },
    },
};