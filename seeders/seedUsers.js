const prisma = require('../config/database/prisma');

async function main() {
  const users = [
    {
      id: '1', 
      email: 'john.doe@example.com',
      username: 'johndoe',
      first_name: 'John',
      last_name: 'Doe',
      telephone: '1234567890',
      address: '123 Main St',
      group_id: 1, 
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      username: 'janesmith',
      first_name: 'Jane',
      last_name: 'Smith',
      telephone: '0987654321',
      address: '456 Elm St',
      group_id: 1,
    },
    {
      id: '3',
      email: 'alex.jones@example.com',
      username: 'alexjones',
      first_name: 'Alex',
      last_name: 'Jones',
      telephone: null,
      address: null,
      group_id: 2,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email }, // Ensures no duplicate email
      update: {}, // Do not update anything if the record exists
      create: {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        telephone: user.telephone,
        address: user.address,
        group_id: user.group_id,
      },
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
