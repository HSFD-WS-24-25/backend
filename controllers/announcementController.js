const prisma = require('../config/database/prisma');

const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await prisma.announcement.findMany();
        res.json(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createAnnouncement = async (req, res) => {
    try {
        const { title, method, status } = req.body;
        const date_start = new Date(req.body.date_start);
        const date_end = new Date(req.body.date_end);

        const announcementsData = {
            title, 
            method, 
            date_start, 
            date_end, 
            status 
        };

        const announcement = await prisma.announcement.create({
            data: announcementsData,
        });

        res.json({ success: { message: 'Successfully saved', values: announcement } });
    } catch (error) {
        console.error('Error saving event:', error);
        res.json({ error: { message: 'Error saving event. Please try again' } });
    }
};



module.exports = { getAllAnnouncements, createAnnouncement };