const { body } = require('express-validator');

const validateGuest = [
    body("emails")
        .isArray()
        .withMessage("Emails must be an array")
        .notEmpty()
        .withMessage("Emails array cannot be empty"),

    body("emails.*")
        .isEmail()
        .withMessage("Each email must be a valid email address"),

    body("eventID")
        .trim()
        .notEmpty()
        .withMessage("Event ID is required")
        .isInt()
        .withMessage("Event ID must be an integer")
        .toInt(), // Convert to an integer automatically
];

module.exports = { validateGuest };
