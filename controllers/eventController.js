const prisma = require('../models/prisma');

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

const getEventByName = async (req, res) => {
  const { name } = req.params;

  try {
    const events = await prisma.event.findMany({
      where: {
        name: {
          contains: name, // Partial match
          mode: 'insensitive', // Case-insensitive search
        },
      },
    });

    if (events.length === 0) {
      return res.status(404).json({ error: 'No events found matching the name' });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
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

module.exports = { getAllEvents, getEventById, getEventByName, createEvent };