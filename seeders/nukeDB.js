const prisma = require('../config/database/prisma');

async function deleteAllData() {
    try {
        console.log('Deleting all data...');

        // 1. Delete entries in the many-to-many join table
        await prisma.$executeRaw`DELETE FROM "_PermissionToRole";`;
        console.log('All entries in _PermissionToRole deleted.');
        
        // 2. Delete all participants
        await prisma.participant.deleteMany({});
        console.log('All participants deleted.');

        // 3. Delete all events
        await prisma.event.deleteMany({});
        console.log('All events deleted.');

        // 4. Delete all users (to avoid foreign key constraints with roles)
        await prisma.user.deleteMany({});
        console.log('All users deleted.');

        // 5. Delete all roles
        await prisma.role.deleteMany({});
        console.log('All roles deleted.');

        // 6. Delete all permissions
        await prisma.permission.deleteMany({});
        console.log('All permissions deleted.');

        // 7. Delete all organizations
        await prisma.organization.deleteMany({});
        console.log('All organizations deleted.');

        console.log('All data has been deleted successfully.');
    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

deleteAllData();
