const prisma = require('../config/database/prisma');

async function seedOrganizations() {
    const organizations = [
      {
        name: "TechCorp",
        description: "A leading technology company.",
      },
      {
        name: "HealthPlus",
        description: "Healthcare solutions provider.",
      },
      {
        name: "EduNation",
        description: "Education and learning solutions.",
      },
      {
        name: "GreenEarth",
        description: "Environmental protection and sustainability.",
      },
      {
        name: "FinExperts",
        description: "Financial and consulting services.",
      },
    ];

    for (const org of organizations) {
      await prisma.organization.create({
        data: org,
      });
    } 
}

module.exports = { seedOrganizations };	