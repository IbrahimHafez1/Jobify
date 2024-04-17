import { body, param, validationResult } from "express-validator";
import { BadRequestError, notFoundError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            if (errorMessages[0].startsWith('no job')) {
                throw new notFoundError(errorMessages[0]);
            }
            throw new BadRequestError(errorMessages);
        }
        next();
    }];
};

export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus')
        .isIn(Object.values(JOB_STATUS))
        .withMessage('job status is required'),
    body('jobType')
        .isIn(Object.values(JOB_TYPE))
        .withMessage('job type is required'),
])

export const validateIdParam = withValidationErrors([
    param('id')
        .custom(async (value) => {
            const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
            const job = await Job.findById(value);
            if (!job) {
                throw new notFoundError(`no job with id ${value}`);
            }
        })
])

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email').custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) throw new BadRequestError('email already in use');
    }),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
])
export const validateLoginInput = withValidationErrors([
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email'),
    body('password').notEmpty().withMessage('password is required'),
])