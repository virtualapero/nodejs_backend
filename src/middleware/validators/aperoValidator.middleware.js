const { body } = require('express-validator');


exports.createAperoSchema = [
    body('apero_date')
        .exists()
        .withMessage('apero_date is required')
        .isISO8601()
        .withMessage('Must be at a Date'),
    body('image')
        .optional()
        .isLength({ min: 19 })
        .withMessage('Must be at least 19 chars long'),
];

exports.updateAperoSchema = [
    body('apero_date')
        .optional()
        .isISO8601()
        .withMessage('Must be at a Date'),
    body('image')
        .optional()
        .isLength({ min: 19 })
        .withMessage('Must be at least 19 chars long'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['apero_date', 'image'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
