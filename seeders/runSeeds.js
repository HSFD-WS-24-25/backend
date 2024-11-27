const seedEvents = require('./seedEvents');
const seedGroup = require('./seedGroup');
const seedUsers = require('./seedUsers');

async function runSeeds() {
  try {
    console.log('Starting all seeding scripts...');

    console.log('Seeding Groups...');
    await seedGroup.seedGroup();

    console.log('Seeding Users...');
    await seedUsers.seedUsers();

    console.log('Seeding Events...');
    await seedEvents.seedEvents();

    console.log('All seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

runSeeds()
