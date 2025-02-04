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

const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.announcement.delete({
            where: { id: parseInt(id, 10) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
};

const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await prisma.announcement.update({
            where: { id: parseInt(id, 10) },
            data: req.body,
        });
        res.status(200).json(updateAnnouncement);
    } catch (error) {
        res.status(500).json({ error: "Failed to update event" });
    }
};



module.exports = { getAllAnnouncements, createAnnouncement, deleteAnnouncement, updateAnnouncement};