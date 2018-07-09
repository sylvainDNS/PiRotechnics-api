import Joi from 'joi'

export const stepSchema = {
    show_id: Joi.string()
        .length(36)
        .required(),
    time: Joi.number()
        .min(1)
        .required()
}
