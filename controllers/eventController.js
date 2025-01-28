const prisma = require('../config/database/prisma');
const { sendEmail } = require('../services/emailService');
const { prepareHtmlEvent } = require('../helpers/htmlHelper');

// https://www.prisma.io/docs/orm/prisma-client/queries/crud
const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) },
            include: {
                participants: {
                    where: { event_id: parseInt(id) },
                    select: {
                        status: true,
                        additional_guest: true,
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                email: true,
                                telephone: true,
                                address: true,
                            },
                        }
                    },
                },
            },
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const participantCount = await prisma.participant.count({
            where: { event_id: parseInt(id) },
        });

        const additionalGuestsCount = await prisma.participant.aggregate({
            where: { event_id: parseInt(id) },
            _sum: {
                additional_guest: true,
            },
        });

        res.json({
            ...event,
            _count: {
                total_participants: participantCount + (additionalGuestsCount._sum.additional_guest || 0),
            },
        });
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createEvent = async (req, res) => {
    try {
        const { name, description, location, capacity, reminder, max_additional_guests } = req.body;
        const date_start = new Date(req.body.date_start);
        const date_end = new Date(req.body.date_end);

        const eventData = {
            name,
            description,
            location,
            date_start,
            date_end,
            capacity,
            reminder,
            max_additional_guests
        };

        const event = await prisma.event.create({
            data: eventData,
        });

        sendConfirmationEmailToUser(req.user, event);
        res.json({ success: { message: 'Successfully saved', values: event } });
    } catch (error) {
        console.error('Error saving event:', error);
        res.json({ error: { message: 'Error saving event. Please try again' } });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.event.delete({
            where: { id: parseInt(id, 10) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await prisma.event.update({
            where: { id: parseInt(id, 10) },
            data: req.body,
        });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to update event" });
    }
};

const sendConfirmationEmailToUser = async (user = null, event) => {
    if (!event) {
        console.error('No event provided to sendConfirmationEmailToUser');
        return;
    }

    const email = user?.email;
    if (!email) {
        console.error('No user email provided to sendConfirmationEmailToUser');
        return;
    }

    let name = null;
    const firstName = user?.first_name;
    const lastName = user?.last_name;
    if (firstName && lastName) {
        name = `${ firstName } ${ lastName }`;
    }

    const recipient = [
        {
            email,
            displayName: name,
        }
    ];

    const heading = 'You have successfully created the following event:';
    const content = {
        subject: 'Event created',
        html: prepareHtmlEvent(heading, event),
    };

    try {
        await sendEmail(recipient, content);
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
}

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent, getEventById };