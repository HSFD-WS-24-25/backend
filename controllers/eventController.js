const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllEvents = async (req, res) => {
    try {
      const events = await prisma.event.findMany();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
/**
  const createEvent = async (req, res) => {
    const { title, description, date, location } = req.body;
  
    try {
      const newEvent = await prisma.event.create({
        data: { title, description, date: new Date(date), location },
      });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
**/
module.exports = { getAllEvents };