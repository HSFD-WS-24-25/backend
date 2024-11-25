const prisma = require('../config/database/prisma');

async function main() {
  const groups = [
    {
      id: 1, 
      name: 'Admin Group',
      description: 'Group for administrators with full access.',
    },
    {
      id: 2,
      name: 'User Group',
      description: 'Group for regular users with limited access.',
    },
    {
      id: 3,
      name: 'Guest Group',
      description: 'Group for guests with minimal access.',
    },
  ];

  for (const group of groups) {
    await prisma.group.upsert({
      where: { id: group.id },
      update: {}, 
      create: {
        id: group.id,
        name: group.name,
        description: group.description,
      },
    });
  }

  console.log('Group seeding complete!');
}

main()
  .catch((error) => {
    console.error('Error during group seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
