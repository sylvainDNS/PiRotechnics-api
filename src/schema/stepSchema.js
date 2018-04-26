import Joi from 'joi'

export const stepSchema = {
    step_id: Joi.string()
        .length(36)
        .required(),
    cueOrder: Joi.number().required(),
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    canal: Joi.number().required(),
    password: Joi.string()
        .min(3)
        .max(30)
        .optional()
}
