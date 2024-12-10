const seedEvents = require('./seedEvents');
const seedGroup = require('./seedRoleAndPermissions');
const seedUsers = require('./seedUsers');

async function runSeeds() {
  try {
    console.log('Starting all seeding scripts...');

    await seedGroup.seedRolesWithPermissions();

    await seedUsers.seedUsers();

    await seedEvents.seedEvents();

    console.log('All seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

runSeeds()
