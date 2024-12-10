const prisma = require('../config/database/prisma');
const { PERMISSIONS } = require('../config/permissions');

const roles = [
    {
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
            PERMISSIONS.VIEW_ALL_USERS,
        ],
    },
    {
        id: 2,
        name: 'admin_organization',
        description: 'Manages organization-specific resources and settings.',
        permissions: [
            PERMISSIONS.CREATE_EVENT,
            PERMISSIONS.DELETE_EVENT,
            PERMISSIONS.EDIT_EVENT,
            PERMISSIONS.INVITE_USER,
            PERMISSIONS.VIEW_ALL_EVENTS,
            PERMISSIONS.VIEW_ALL_USERS
        ],
    },
    {
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
    {
        id: 4,
        name: 'guest',
        description: 'Limited access to view and participate in invited events.',
        permissions: [
            PERMISSIONS.VIEW_INVITED_EVENTS,
        ],
    },
];

async function seedRolesWithPermissions() {

    // Seed Permissions
    for (const key in PERMISSIONS) {
        const permission = PERMISSIONS[key];
        await prisma.permission.upsert({
            where: { id: permission.id },
            update: {},
            create: {
                id: permission.id,
                name: permission.name,
            },
        });
    }

    // Seed Roles with Permissions
    for (const role of roles) {
        await prisma.role.upsert({
            where: { id: role.id },
            update: {},
            create: {
                id: role.id,
                name: role.name,
                description: role.description,
                permissions: {
                    connect: role.permissions.map((permission) => ({ id: permission.id })),
                },
            },
        });
    }

    console.log('Roles with permissions seeded successfully.');
}

seedRolesWithPermissions()
    .catch((e) => {
        console.error('Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

module.exports = { seedRolesWithPermissions };