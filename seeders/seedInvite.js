const prisma = require('../config/database/prisma');

async function seedInvite() {
    try {
        // Fetch all events and users from the database
        const events = await prisma.event.findMany();
        const users = await prisma.user.findMany();

        if (!events.length || !users.length) {
            console.log('No events or users found in the database.');
            return;
        }

        // Pair users and events to create participant entries
        const participantsData = [];
        events.forEach((event) => {
            users.forEach((user) => {
                participantsData.push({
                    event_id: event.id,
                    user_id: user.id,
                    status: null, // Default status
                });
            });
        });

        // Insert participants into the database
        const participants = await prisma.participant.createMany({
            data: participantsData,
            skipDuplicates: true, // Avoid duplicating participants if seeding multiple times
        });

        console.log('Seeded Participants:', participants.count);
    } catch (err) {
        console.error('Error while seeding database:', err);
    } finally {
        await prisma.$disconnect();
    }
}

seedInvite();