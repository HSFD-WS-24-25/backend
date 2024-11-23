const prisma = require('../prisma/prismaClient'); // Assuming you set up Prisma client

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Replace 'user' with your Prisma model
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
