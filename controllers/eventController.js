const prisma = require('../config/database/prisma');

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
        });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createEvent = async (req, res) => {
    try {
        const { name, description, location, capacity, reminder, max_additional_guests } = req.body;
        const date_start = new Date(req.body.date_start);
        const date_end = new Date(req.body.date_end);

        const events = await prisma.event.create({
            data: {
                name,
                description,
                location,
                date_start,
                date_end,
                capacity,
                reminder,
                max_additional_guests
            }
        });
        res.json({ success: { message: 'Successfully saved', values: events } });
    } catch (error) {
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

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent, getEventById };