const prisma = require('../config/database/prisma');

const getEvent = async (req, res) => {
    const { inviteID } = req.params;
    //TODO: Implement Decryption of inviteID
    console.log(inviteID);
    const [ eventID, userID, creationDate ] = inviteID.split('.');
    // Check if inviteID has all necessary information
    if(!eventID || !userID || !creationDate){
        return res.status(400).json({ error: 'Invalid inviteID' });
    }
    console.log(`Event: ${eventID} User: ${userID} Creation: ${creationDate}`);
    try {
        //Check if user is invited to event
        const particip = await prisma.participant.findFirst({
            where: { event_id: parseInt(eventID), user_id: userID },
        });
        if(!particip){
            return res.status(404).json({ error: 'Event not found' });
        }
        // TODO: Check if invite is still valid
        const event = await prisma.event.findUnique({
            where: { id: parseInt(eventID) },
        });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        
    }
}

module.exports = { getEvent };
    