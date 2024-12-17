const prisma = require('../config/database/prisma');

async function seedOrganisations() {
    console.log('Seeding organizations...');

    const organizations = [
        {
            id: 1,
            name: 'Tech Innovators Inc.',
            description: 'A company focused on innovative technology solutions.',
        },
        {
            id: 2,
            name: 'Green Earth Nonprofit',
            description: 'An organization dedicated to environmental protection.',
        },
        {
            id: 3,
            name: 'Healthcare Solutions Ltd.',
            description: 'A healthcare service provider.',
        },
        {   
            id: 4,
            name: 'Education for All Foundation',
            description: 'A foundation promoting global education.',
        },
    ];

    for (const org of organizations) {
        await prisma.organization.upsert({
            where: { id: org.id },
            update: {},
            create: {              
                id: org.id,
                name: org.name,
                description: org.description,
            }
        });
    }

    console.log('Organizations seeded successfully.');
}

seedOrganisations()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

module.exports = { seedOrganisations };