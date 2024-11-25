const prisma = require('../config/database/prisma');

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(require('../models/users.json'));
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getAllUsers };
