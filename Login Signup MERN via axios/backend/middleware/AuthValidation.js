const Joi = require('joi');


const signupValidation = (req, res, next) => {
    // Define the schema with validation rules
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required()
            .messages({
                'string.base': 'Name should be a type of text',
                'string.empty': 'Name is required',
                'string.min': 'Name should have a minimum length of {#limit}',
                'string.max': 'Name should have a maximum length of {#limit}',
                'any.required': 'Name is required'
            }),
        email: Joi.string().email().required()
            .messages({
                'string.base': 'Email should be a type of text',
                'string.email': 'Email must be a valid email',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            }),
        password: Joi.string().min(4).max(100).required()
            .messages({
                'string.base': 'Password should be a type of text',
                'string.empty': 'Password is required',
                'string.min': 'Password should have a minimum length of {#limit}',
                'string.max': 'Password should have a maximum length of {#limit}',
                'any.required': 'Password is required'
            }),
    });

    // Validate request body against the schema
    const { error } = schema.validate(req.body, { abortEarly: false });

    // If validation fails, return a 400 response with detailed error messages
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({
            message: "Validation error",
            errors: errorMessages
        });
    }

    // Proceed to the next middleware if validation passes
    next();
};

const loginValidation = (req, res, next) => {
    // Define the schema with validation rules
    const schema = Joi.object({
        email: Joi.string().email().required()
            .messages({
                'string.base': 'Email should be a type of text',
                'string.email': 'Email must be a valid email address',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            }),
        password: Joi.string().min(4).max(100).required()
            .messages({
                'string.base': 'Password should be a type of text',
                'string.empty': 'Password is required',
                'string.min': 'Password should have a minimum length of {#limit}',
                'string.max': 'Password should have a maximum length of {#limit}',
                'any.required': 'Password is required'
            }),
    });

    // Validate request body against the schema
    const { error } = schema.validate(req.body, { abortEarly: false });

    // If validation fails, return a 400 response with detailed error messages
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({
            message: "Validation error",
            errors: errorMessages
        });
    }

    // Proceed to the next middleware if validation passes
    next();
};

module.exports = {
    signupValidation,
    loginValidation
}