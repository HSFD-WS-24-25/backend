const prisma = require('../config/database/prisma');

const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await prisma.organization.findMany();
        res.json(organizations);
    } catch (error) {
        console.error('Error fetching organizations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getOrganizationById = async (req, res) => {
    const { id } = req.params;
    try {
        const organization = await prisma.organization.findUnique({
            where: { id: parseInt(id) },
        });
        if (organization) {
            res.json(organization);
        } else {
            res.status(404).json({ error: 'Organization not found' });
        }
    } catch (error) {
        console.error('Error fetching organization:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createOrganization = async (req, res) => {
    const { name, description } = req.body;
    try {
        const organization = await prisma.organization.create({
            data: { name, description },
        });
        res.status(201).json(organization);
    } catch (error) {
        console.error('Error creating organization:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateOrganization = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const organization = await prisma.organization.update({
            where: { id: parseInt(id) },
            data: { name, description },
        });
        res.json(organization);
    } catch (error) {
        console.error('Error updating organization:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteOrganization = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.organization.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting organization:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAllOrganizations, getOrganizationById, createOrganization, updateOrganization, deleteOrganization };