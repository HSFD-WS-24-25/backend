const prisma = require('../config/database/prisma');

async function seedUsers() {
  
  const users = [
    {
        sub: 'auth0|1234567890',
        email: 'johndoe@example.com',
        username: 'johndoe',
        first_name: 'John',
        last_name: 'Doe',
        telephone: '123-456-7890',
        address: '123 Main St, Springfield',
        role_id: 1, // Assuming 1 corresponds to 'admin_instance' role
    },
    {
        sub: 'auth0|0987654321',
        email: 'janedoe@example.com',
        username: 'janedoe',
        first_name: 'Jane',
        last_name: 'Doe',
        telephone: '987-654-3210',
        address: '456 Elm St, Metropolis',
        role_id: 2, 
    },
    {
        sub: 'auth0|1122334455',
        email: 'bobsmith@example.com',
        username: 'bobsmith',
        first_name: 'Bob',
        last_name: 'Smith',
        telephone: '555-123-4567',
        address: '789 Oak St, Gotham',
        role_id: 3, // Assuming 3 corresponds to 'organizer' role
    },
    {
        sub: 'auth0|5544332211',
        email: 'alicesmith@example.com',
        username: 'alicesmith',
        first_name: 'Alice',
        last_name: 'Smith',
        telephone: '444-321-7890',
        address: '101 Pine St, Star City',
        role_id: 4, // Assuming 4 corresponds to 'guest' role
    },
];

  for (const user of users) {
      await prisma.user.upsert({
          where: { sub: user.sub },
          update: {},
          create: user,
      });
  }

  console.log('Users seeded successfully!');
}

module.exports = { seedUsers };	