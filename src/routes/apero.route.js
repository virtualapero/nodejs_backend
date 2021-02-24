const express = require('express');
const router = express.Router();
const aperoController = require('../controllers/apero.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createAperoSchema, updateAperoSchema } = require('../middleware/validators/aperoValidator.middleware');


router.get('/', awaitHandlerFactory(aperoController.getAllAperos)); // localhost:3000/api/v1/aperos
router.get('/id/:id', awaitHandlerFactory(aperoController.getAperoById)); // localhost:3000/api/v1/aperos/id/1
router.get('/aperodate/:aperodate', awaitHandlerFactory(aperoController.getAperoByDate)); // localhost:3306/api/v1/aperos/aperodate/1608055200
router.post('/', auth(Role.Admin), createAperoSchema, awaitHandlerFactory(aperoController.createApero)); // localhost:3000/api/v1/aperos
router.patch('/id/:id', auth(Role.Admin), updateAperoSchema, awaitHandlerFactory(aperoController.updateApero)); // localhost:3000/api/v1/aperos/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(aperoController.deleteApero)); // localhost:3000/api/v1/aperos/id/1

module.exports = router;