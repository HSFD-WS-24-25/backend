const prisma = require('../config/database/prisma');

async function seedInvite() {
    try {
        const participants = await prisma.participant.createMany({
            data: [
                //change the event_id and user_id to match the data in the database !!!
                { event_id: 1, user_id: '8f9551d8-37c8-4ad4-a038-3588a8d62d1f', status: null },
                { event_id: 1, user_id: '6e67a084-8540-453b-874b-485e5ebac3fa', status: null },
                { event_id: 2, user_id: '8f9551d8-37c8-4ad4-a038-3588a8d62d1f', status: null },
            ],
        });
        console.log('Seeded Participants:', participants.count);
    } catch (err) {
        console.error('Error while seeding database:', err);
    } finally {
        await prisma.$disconnect();
    }
}

seedInvite();