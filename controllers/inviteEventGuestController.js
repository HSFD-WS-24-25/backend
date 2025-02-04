const { sendEmail } = require('../services/emailService');
const { prisma } = require('../prisma/prisma-client');
const { roles } = require('../constants/roles');

const inviteGuests = async (req, res) => {
    const emails = req.body.emails;
    const eventID = req.body.eventID;

    if (!eventID) {
        return res.status(400).json({ error: 'Invalid request. EventID cannot be empty' });
    }

    if (!emails || !Array.isArray(emails) || 0 === emails.length) {
        return res.status(400).json({ error: 'Invalid request. Emails must be an array of at least one email' });
    }

    // Convert emails to objects with email property (Needed for sendEmail function)
    const emailObjects = emails.map(email => ({ email }));

    try {
        emailObjects.forEach(object => {
            // TODO: Assign unique invitation URL to each guest
            const emailContent = {
                subject: 'Event-Invitation',
                plainText: `You are invited to the following event...`,
            }
            addGuestToDatabase(object.email)
            // Not sending all emails at once, as every user has specific url to participate
            sendEmail([object], emailContent);
        });

        return res.json({ message: 'Invitation sent successfully' });
    } catch (error) {
        console.error('Error inviting guests:', error);
        return res.status(500).json({ error: 'Invitation sending failed. Please try again later.' });
    }
}

const getAllInvitedGuests = async (req, res) => {
    // Implement this function to get all invited guests
}


// Should the id be returned? Would allow easier invite link generation
async function addGuestToDatabase(email) {
    const sub = 'internal';
    // Add guest to database if not already present
    try {
        const user = await prisma.participant.create({
            data: {
                email: email,
                role_id: roles.GUEST.id,
                sub,
            },
        });
        return user;
    // Is this really an error? A user might already exist
    } catch (error) {
        console.error('Error adding guest to database:', error);
        throw new Error('Error adding guest to database');
    }
}

module.exports = { inviteGuests, getAllInvitedGuests };