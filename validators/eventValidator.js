const { body } = require('express-validator');

// TODO: Add more validations
// TODO: Define error messages in a separate file to use globally
const validateEvent = [
    body('name')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),

    body('description')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),

    body('location')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Location is required'),
];

module.exports = { validateEvent };
