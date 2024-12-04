/*
* Use this file to define the permissions for application.
* Each permission should have a unique id and name.
* Write the keys in uppercase, use underscores for spaces and in alphabetical order.
* TODO: Add/Edit permissions, update their IDs and names
* */

module.exports = {
    PERMISSIONS: {
        CREATE_EVENT: {
            id: 1,
            name: 'view_projects'
        },
        CREATE_ORGANIZATION: {
            id: 1,
            name: 'view_projects'
        },
        DEFAULT: {
            id: 5,
            name: 'default'
        },
        DELETE_EVENT: {
            id: 2,
            name: 'view_projects'
        },
        DELETE_ORGANIZATION: {
            id: 2,
            name: 'view_projects'
        },
        EDIT_EVENT: {
            id: 3,
            name: 'view_projects'
        },
        EDIT_ORGANIZATION: {
            id: 3,
            name: 'view_projects'
        },
        INVITE: {
            id: 4,
            name: 'view_projects'
        },
        VIEW_ALL: {
            id: 1,
            name: 'everything'
        },
        VIEW_CREATED: {
            id: 5,
            name: 'everything'
        },
        VIEW_INVITED: {
            id: 5,
            name: 'view_projects'
        },
    },
};
