const { body } = require('express-validator');


exports.createAperoTopicSchema = [
    body('name')
        .exists()
        .withMessage('name is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('description')
        .exists()
        .withMessage('description is required')
        .isLength({ min: 6 })
        .withMessage('Description should contain at least 6 characters')
        .isLength({ max: 255 })
        .withMessage('Description can contain max 255 characters'),
    body('aperoId')
        .exists()
        .withMessage('aperoId is required'),
];

exports.updateAperoTopicSchema = [
    body('aperoId')
        .optional(),
    body('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('description')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['name', 'description', 'aperoId'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
