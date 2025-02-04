const prisma = require('../config/database/prisma');
const emailserv = require('../services/emailService');
const lowestPermsission = 4;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';


const getAllParticipants = async (req, res) => {
    console.log(req);
    const allUsers = await prisma.user.findMany();
    const allUsersTrimmed = allUsers.map((user) => {
        return {
            email: user.email,
            last_name: user.last_name,
            first_name: user.first_name,
        };
    });
    return res.status(200).json(allUsersTrimmed);
};

const createParticipants = async (req, res) => {
    const eventID = parseInt(req.params.eventID);
    const participantsEmails = req.body.participants;
    const participant = [];
    for (const email of participantsEmails) {
        let user = await prisma.user.findUnique({
            where: { email: email },
        });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: email,
                    role_id: lowestPermsission,
                    sub: "internal",
                },
            });
            
        }
        participant.push(user);
    }
    
    for (let index = 0; index < participant.length; index++) {
        const existingParticipant = await prisma.participant.findUnique({
            where: {
                user_id_event_id: {
                    user_id: participant[index].id,
                    event_id: eventID
                }
            }
        });
    
        if (!existingParticipant) {
            const createdParticipant = await prisma.participant.create({
                data: {
                    event_id: eventID,
                    user_id: participant[index].id,
                },
            });
            if (!createdParticipant) {
                console.error("Error creating participant: ", participant[index]);
            }
        } else {
            console.log("Participant already exists: ", existingParticipant);
        }
    }
    
    // Send response after creating participants
    res.status(200).json({ message: "Participants added successfully" });
    
    // Send emails asynchronously
    for (let index = 0; index < participant.length; index++) {
        const emailContent = {
            subject: "You have been invited to an event",
            html: `<p>You have been invited to an event. Click <a href="${CLIENT_URL}/join/${eventID}.${participant[index].id}">here</a> to join.</p>`,
        }
        console.log(participant[index]);
        let tempParticipant = [];
        tempParticipant.push(participant[index]);
        emailserv.sendEmail(tempParticipant, emailContent);
    }
};

module.exports = { getAllParticipants, createParticipants };