const prisma = require('../config/database/prisma');

async function seedGroup() {
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
}

module.exports = { seedGroup };