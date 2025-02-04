const { sendEmail } = require('../services/emailService');
const prisma = require('../config/database/prisma');
const { roles } = require('../config/roles');
const { prepareHtmlInvite } = require('../helpers/htmlHelper');

const inviteGuests = async (req, res) => {
    const emails = req.body.emails;
    //Switch to params as it is more logical to have the eventID in the URL
    const eventID = parseInt(req.params.eventID);

    if (!eventID) {
        return res.status(400).json({ error: 'Invalid request. EventID cannot be empty' });
    }

    if (!emails || !Array.isArray(emails) || 0 === emails.length) {
        return res.status(400).json({ error: 'Invalid request. Emails must be an array of at least one email' });
    }

    // Convert emails to objects with email property (Needed for sendEmail function)
    const emailObjects = emails.map(email => ({ email }));
    // Get event by ID
    const event = await getEventById(eventID);

    try {
        // foreach does not work with async/await
        // Could check this out: 
        // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
        for (emailObj of emailObjects) {
            // First check if the guest is already in the database
            let guest = await prisma.user.findUnique({
                where: {
                    email: emailObj.email,
                },
            });
            if (!guest) {
                // If not, add the guest to the database
                guest = await addGuestToDatabase(emailObj.email);
            }
            // TODO: Add Guest to Event


            // Send email to guest
            const emailContent = {
                subject: `Event-Invitation: ${event.name}`,
                html: prepareHtmlInvite('Event Invitation', guest, event),
            }
            // Not sending all emails at once, as every user has specific url to participate
            sendEmail([emailObj], emailContent);
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


// Can we do this with eventContoller.js?
async function getEventById(eventID) {
    try {
        const event = await prisma.event.findUnique({
            where: {
                id: eventID,
            },
        });
        return event;
    } catch (error) {
        console.error('Error getting event by ID:', error);
        throw new Error('Error getting event by ID');
    }
}

module.exports = { inviteGuests, getAllInvitedGuests };