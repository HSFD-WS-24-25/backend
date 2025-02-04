const { sendEmail } = require('../services/emailService');
const prisma = require('../config/database/prisma');
const { roles } = require('../config/roles');
const { prepareHtmlInvite } = require('../helpers/htmlHelper');

const inviteGuests = async (req, res) => {
    const emails = req.body.emails;
    //Switch to params as it is more logical to have the eventID in the URL
    const eventID = req.params.eventID;

    if (!eventID) {
        return res.status(400).json({ error: 'Invalid request. EventID cannot be empty' });
    }

    if (!emails || !Array.isArray(emails) || 0 === emails.length) {
        return res.status(400).json({ error: 'Invalid request. Emails must be an array of at least one email' });
    }

    // Convert emails to objects with email property (Needed for sendEmail function)
    const emailObjects = emails.map(email => ({ email }));
    
    try {
        // foreach does not work with async/await
        for (object of emailObjects) {
            console.log('Inviting guest:', object);
            // First check if the guest is already in the database
            let guest = await prisma.user.findUnique({
                where: {
                    email: object.email,
                },
            });
            if (!guest) {
                // If not, add the guest to the database
                guest = addGuestToDatabase(object.email);
            }
            // TODO: Assign unique invitation URL to each guest
            const emailContent = {
                subject: 'Event-Invitation',
                html: prepareHtmlInvite('Event Invitation', object, eventID),
            }
            console.log('Email content:', emailContent);
            // Not sending all emails at once, as every user has specific url to participate
            //sendEmail([object], emailContent);
        };

        return res.json({ message: 'Invitation sent successfully' });
    } catch (error) {
        console.error('Error inviting guests:', error);
        return res.status(500).json({ error: 'Invitation sending failed. Please try again later.' });
    }
}

const getAllInvitedGuests = async (req, res) => {
    // Implement this function to get all invited guests
    res.status(501).json({ error: 'Not implemented' });
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