const AperoModel = require('../models/apero.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Apero Controller
 ******************************************************************************/
class AperoController {
    getAllAperos = async (req, res, next) => {
        let aperoList = await AperoModel.find();
        if (!aperoList.length) {
            throw new HttpException(404, 'Aperos not found');
        }

        res.send(aperoList);
    };

    getAperoById = async (req, res, next) => {
        const apero = await AperoModel.findOne({ id: req.params.id });
        if (!apero) {
            throw new HttpException(404, 'Apero not found');
        }

        res.send(apero);
    };

    createApero = async (req, res, next) => {
        this.checkValidation(req);

        const result = await AperoModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Apero was created!');
    };

    updateApero = async (req, res, next) => {
        this.checkValidation(req);

        const { ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await AperoModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Apero not found' :
            affectedRows && changedRows ? 'Apero updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteApero = async (req, res, next) => {
        const result = await AperoModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Apero not found');
        }
        res.send('Apero has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new AperoController;