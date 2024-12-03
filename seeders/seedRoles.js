const prisma = require('../config/database/prisma');

async function seedRoles() {
    const roles = [
      {
        name: "Admin",
        description: "Administrator role with full access.",
        organization_id: 1, 
      },
      {
        name: "User",
        description: "Standard user with limited access.",
        organization_id: 1, 
      },
      {
        name: "Viewer",
        description: "Viewer role with read-only access.",
        organization_id: 1, 
      },
      {
        name: "Manager",
        description: "Manager role with permissions to oversee operations.",
        organization_id: 2, 
      },
      {
        name: "Editor",
        description: "Editor role with content modification permissions.",
        organization_id: 2, 
      },
      {
        name: "Viewer",
        description: "Viewer role with read-only access.",
        organization_id: 1, 
      },
      {
        name: "Viewer",
        description: "Viewer role with read-only access.",
        organization_id: 3, 
      },
    ];

    for (const role of roles) {
      await prisma.role.create({
        data: role,
      });
    }
}

module.exports = { seedRoles };	

