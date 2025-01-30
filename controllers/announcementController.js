const prisma = require('../config/database/prisma');

const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await prisma.announcements.findMany();
        res.json(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { getAllAnnouncements, createAnnouncement };