const { sendEmail } = require('../services/emailService');

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

    const emailContent = {
        subject: 'Event-Invitation',
        plainText: `You are invited to the following event...`,
    }

    try {
        emailObjects.forEach(object => {
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

function addGuestToDatabase(email) {
    const sub = 'internal';
    // Add guest to database if not already present
    try {

    } catch (error) {
        console.error('Error adding guest to database:', error);
        throw new Error('Error adding guest to database');
    }
}

module.exports = { inviteGuests, getAllInvitedGuests };