const users = require('../models/users.json');

exports.getAllUsers = (req, res) => {
    res.json(users); // Sends the JSON data
};
