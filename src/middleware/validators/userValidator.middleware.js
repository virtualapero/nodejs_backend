const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createUserSchema = [
    body('username')
        .exists()
        .withMessage('username is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('twitter_handle')
        .exists()
        .withMessage('If you do not have an twitter account please add your username here again')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('image')
        .exists()
        .withMessage('imagepath is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.SuperUser])
        .withMessage('Invalid Role type'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .isLength({ max: 10 })
        .withMessage('Password can contain max 10 characters'),
    body('confirm_password')
        .exists()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field')
];

exports.updateUserSchema = [
    body('username')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('twitter_handle')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('image')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.SuperUser])
        .withMessage('Invalid Role type'),
    body('password')
        .optional()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .isLength({ max: 10 })
        .withMessage('Password can contain max 10 characters')
        .custom((value, { req }) => !!req.body.confirm_password)
        .withMessage('Please confirm your password'),
    body('confirm_password')
        .optional()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['username', 'password', 'confirm_password', 'role', 'twitter_handle', 'image'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateLogin = [
    body('username')
        .exists()
        .withMessage('Username is required')
        .isLength({ min:3 })
        .withMessage('Must be at least 3 chars long')
        .notEmpty()
        .withMessage('Username must be filled'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];