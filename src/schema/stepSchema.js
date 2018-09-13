import Joi from 'joi'

export const stepSchema = {
  show_id: Joi.string()
    .length(36)
    .required(),
  minutes: Joi.number()
    .min(0)
    .required(),
  seconds: Joi.number()
    .min(0)
    .max(59)
    .required()
}
