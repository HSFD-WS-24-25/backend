const prisma = require('../config/database/prisma');

const getEvent = async (req, res) => {
    const { inviteID } = req.params;
    //TODO: Implement Decryption of inviteID
    console.log(inviteID);
    const [ eventID, userID] = inviteID.split('.');
    
    // Check if inviteID has all necessary information
    if(!eventID || !userID){
        return res.status(400).json({ error: 'Invalid inviteID' });
    }

    console.log(`Event: ${eventID} User: ${userID}`);
    try {
        //Check if user is invited to event
        const particip = await prisma.participant.findFirst({
            where: { event_id: parseInt(eventID), user_id: userID },
        });
        console.log(particip);
        if(!particip){
            return res.status(404).json({ error: 'No Invitation Found' });
        }
        // Might need to be updated to the real String
        if(particip.status == null){
            const event = await prisma.event.findUnique({
                where: { id: parseInt(eventID) },
            });
            const response = {
                "check":"unused",
                event
            }
            res.json(response);
        } else {
            const response = {
                "check":"used",
                "message":"You have already participated in this event"
            }
            res.json(response);
        }
        // No need to check if event is valid, since it is a foreign key
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        
    }
}

const participateEvent = async (req, res) => {
    //console.log(req.body);
    const { inviteID } = req.params;
    const [ eventID, userID] = inviteID.split('.');
    
    // Check if inviteID has all necessary information
    if(!eventID || !userID){
        return res.status(400).json({ error: 'Invalid inviteID' });
    }
    const action = req.body.action;
    console.log(action)
    let dbRes = null;
    if(action == "confirm"){
        dbRes = prisma.participant.update({
            where: {event_id: parseInt(eventID), user_id: userID},
            data: {status: "confirm"},
        });
        console.log(dbRes)
    }
} 

const listAllGuestEvents = async (req, res) => {
    console.log(req.body);
}

module.exports = { getEvent, participateEvent, listAllGuestEvents };
    