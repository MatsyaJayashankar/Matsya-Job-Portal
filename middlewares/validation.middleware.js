import { body, validationResult } from 'express-validator';
import JobModel from '../src/models/job.model.js';
export const validatePostJob = [
    body('job_location')
        .isLength({ min: 2 })
        .notEmpty()
        .withMessage('Enter a valid location')
        .trim()
        .escape(),
    body('company_name')
        .isString()
        .notEmpty()
        .withMessage('Company name must be a string')
        .trim()
        .escape(),
    body('salary')
        .isAlphanumeric()
        .notEmpty()
        .withMessage('Salary must be a number')
        .trim()
        .escape(),
    body('apply_by')
        .isISO8601()
        .notEmpty()
        .withMessage('Date must be in ISO 8601 format')
        .custom((value) => {
            const inputDate = new Date(value);
            const today = new Date();
            if (inputDate <= today) {
                throw new Error('Date must be greater than today');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('post-job', {
                errorMessage: errors.array()[0].msg,
                userEmail: req.session.userEmail, userName: req.session.userName
            })
        }
        next();
    },
];

export const validateApplicant = [
    body('name')
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Valid name required')
        .trim()
        .escape(),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),
    body('contact')
        .notEmpty()
        .withMessage('Contact is required')
        .matches(/^\+?\d{10}(\d{2})?$/, "g")        
        .withMessage('Valid 10-digit contact number is required')
        .trim()
        .escape(),
    body('resumeUrl').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('RESUME is required');
        }
        return true;
        }),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('job', {job: JobModel.getJobByID(req.params.id),
                errorMessage: errors.array()[0].msg,
                userEmail: req.session.userEmail, userName: req.session.userName
            })
        }
        next();
    },
];

