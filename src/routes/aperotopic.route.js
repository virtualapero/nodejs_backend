const express = require('express');
const router = express.Router();
const aperoTopicController = require('../controllers/aperotopic.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createAperoTopicSchema, updateAperoTopicSchema } = require('../middleware/validators/aperoTopicValidator.middleware');


router.get('/', awaitHandlerFactory(aperoTopicController.getAllAperoTopics)); // localhost:3000/api/v1/aperotopics
router.get('/id/:id', awaitHandlerFactory(aperoTopicController.getAperoTopicById)); // localhost:3000/api/v1/aperotopics/id/1
router.post('/', auth(Role.Admin), createAperoTopicSchema, awaitHandlerFactory(aperoTopicController.createAperoTopic)); // localhost:3000/api/v1/aperotopic
router.patch('/id/:id', auth(Role.Admin), updateAperoTopicSchema, awaitHandlerFactory(aperoTopicController.updateAperoTopic)); // localhost:3000/api/v1/aperotopics/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(aperoTopicController.deleteAperoTopic)); // localhost:3000/api/v1/aperotopics/id/1

module.exports = router;