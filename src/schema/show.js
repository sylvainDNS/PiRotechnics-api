import Joi from 'joi'

export const showSchema = {
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(3)
        .max(30)
        .optional()
}
