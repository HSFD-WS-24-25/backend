const seedEvents = require('./seedEvents');
const seedRoles = require('./seedRoleAndPermissions');
const seedUsers = require('./seedUsers');
const seedOrg = require('./seedOrganisations');

async function runSeeds() {
  try {
    console.log('Starting all seeding scripts...');

    await seedRoles.seedRolesWithPermissions();

    await seedOrg.seedOrganisations();
    
    await seedUsers.seedUsers();

    await seedEvents.seedEvents();

    console.log('All seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

runSeeds()
