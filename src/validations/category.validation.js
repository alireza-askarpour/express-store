import Joi from 'joi'
import createError from 'http-errors'

export const createCategoryValidation = Joi.object({
  name: Joi.string().required().error(createError.BadRequest('name in invalid')),
  value: Joi.string().required().error(createError.BadRequest('value in invalid')),
})