const prisma = require('../config/database/prisma');
const { PERMISSIONS } = require('../config/permissions');
const { ROLES } = require('../config/roles');

async function main() {
    // Seed Permissions
    console.log('Seeding Permissions...');
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
    console.log('Seeding Roles...');
    for (const key in ROLES) {
        const role = ROLES[key];
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

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
