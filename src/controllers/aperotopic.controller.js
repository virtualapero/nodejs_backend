const AperoTopicModel = require('../models/aperotopic.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              AperoTopic Controller
 ******************************************************************************/
class AperoTopicController {
    getAllAperoTopics = async (req, res, next) => {
        let aperoTopicList = await AperoTopicModel.find();
        if (!aperoTopicList.length) {
            throw new HttpException(404, 'AperoTopics not found');
        }

        res.send(aperoTopicList);
    };

    getAperoTopicById = async (req, res, next) => {
        const aperoTopic = await AperoTopicModel.findOne({ id: req.params.id });
        if (!aperoTopic) {
            throw new HttpException(404, 'AperoTopic not found');
        }

        res.send(aperoTopic);
    };

    createAperoTopic = async (req, res, next) => {
        this.checkValidation(req);

        const result = await AperoTopicModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('AperoTopic was created!');
    };

    updateAperoTopic = async (req, res, next) => {
        this.checkValidation(req);

        const { ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await AperoTopicModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'AperoTopic not found' :
            affectedRows && changedRows ? 'AperoTopic updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteAperoTopic = async (req, res, next) => {
        const result = await AperoTopicModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'AperoTopic not found');
        }
        res.send('AperoTopic has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation failed', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new AperoTopicController;