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

const storeEvent = async (req, res) => {
  try {
    const events = await prisma.event.create({
      data: {
        name: req.name,
        description: req.description,
        date_start: req.date_start,
        date_end:req.date_end,
        location: req.location,
        capacity: req.capacity,
        reminder: req.reminder,
        max_additional_guests: req.max_additional_guests
      }
    });
    res.status(201).json({ success: 'Internal server error' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};





module.exports = { getAllEvents, getEventById, getEventByName, storeEvent };