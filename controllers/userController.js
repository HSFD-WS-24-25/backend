const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        group: true, // falls die Gruppe der Nutzer einbezogen werden soll
        participants: true, // falls Teilnehmer-Daten benötigt werden
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const {
      email,
      username,
      first_name,
      last_name,
      telephone,
      address,
      group_id,
    } = req.body;

    // Sicherstellen, dass group_id ein Integer ist
    const parsedGroupId = parseInt(group_id, 10);
    if (isNaN(parsedGroupId)) {
      return res.status(400).json({ error: 'Invalid group_id. It must be an integer.' });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        first_name,
        last_name,
        telephone,
        address,
        group_id: parsedGroupId,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);

    if (error.code === 'P2002') {
      return res.status(400).json({
        error: `Unique constraint failed on field: ${error.meta.target}`,
      });
    }

    res.status(500).json({ error: 'Failed to create user' });
  }
};


// DELETE /users/:id
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: {
        id: parseInt(id, 10), // Umwandlung von String in Int
      },
    });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};


// PUT /users/:id
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, username, first_name, last_name, telephone, address, group_id } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id, 10), // Umwandlung von String in Int
      },
      data: {
        email,
        username,
        first_name,
        last_name,
        telephone,
        address,
        group_id,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);

    if (error.code === 'P2025') {
      // Prisma-Fehler: Datensatz nicht gefunden
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(500).json({ error: 'Failed to update user' });
  }
};

module.exports = { getAllUsers, createUser, deleteUser, updateUser };
