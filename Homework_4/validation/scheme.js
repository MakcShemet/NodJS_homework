const Joi = require('joi');

const userScheme = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    age: Joi.number().min(1).max(2).required(),
    phone: Joi.string().min(11).max(12).required(),
    email: Joi.string().email().required()
});

const userIdScheme = Joi.object({
    id: Joi.number().required()
});

module.exports = { userIdScheme, userScheme }