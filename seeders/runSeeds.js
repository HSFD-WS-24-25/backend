const seedEvents = require('./seedEvents');
const seedOrganizations = require('./seedOrganizations');
const seedUsers = require('./seedUsers');
const seedRoles = require('./seedRoles');

async function runSeeds() {
  try {
    console.log('Starting all seeding scripts...');

    console.log('Seeding Organizations...');
    await seedGroup.seedOrganizations();

    console.log('Seeding Roles...');
    await seedRoles.seedRoles();

    console.log('Seeding Users...');
    await seedUsers.seedUsers();

    console.log('Seeding Events...');
    await seedEvents.seedEvents();

    console.log('All seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

runSeeds()
