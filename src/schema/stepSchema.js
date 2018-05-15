import Joi from 'joi'

export const stepSchema = {
    show_id: Joi.string()
        .length(36)
        .required(),
    cueOrder: Joi.number()
        .min(1)
        .max(28)
        .required(),
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    channel: Joi.number()
        .min(1)
        .max(28)
        .required(),
    time: Joi.number()
        .min(1)
        .required()
}
