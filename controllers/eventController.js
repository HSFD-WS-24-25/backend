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

module.exports = { getAllEvents, getEventById };