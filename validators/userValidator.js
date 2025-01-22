const { body } = require('express-validator');

const validateUserData = [
    body('firstName')
        .isString().withMessage('First name must be a string')
        .isLength({ min: 3, max: 100 }).withMessage('First name must be between 3 and 100 characters'),

    body('lastName')
        .isString().withMessage('Last name must be a string')
        .isLength({ min: 10, max: 100 }).withMessage('Last name must be between 3 and 100 characters'),

    body('username')
        .isString().withMessage('Username must be a string'),

    body('email')
        .isString().withMessage('Email must be a string')
        .isEmail().withMessage('Email is not valid'),

    body('telephone')
        .isString().withMessage('Telephone must be a string')
        .isLength({ min: 7, max: 15 }).withMessage('Telephone must be between 7 and 15 characters')
        .matches(/^(0|\+[1-9]\d{0,14})$/).withMessage('Telephone must be a valid phone number'),

    body('address')
        .isString().withMessage('Name must be a string')
];

module.exports = { validateUserData };
