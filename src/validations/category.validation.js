import Joi from 'joi'
import createError from 'http-errors'

export const createCategoryValidation = Joi.object({
  name: Joi.string().required().error(createError.BadRequest('name in invalid')),
  value: Joi.string().required().error(createError.BadRequest('value in invalid')),
})

export const updateategoryValidation = Joi.object({
  name: Joi.string().error(createError.BadRequest('name in invalid')),
  value: Joi.string().error(createError.BadRequest('value in invalid')),
})

export const createSubcategoryValidation = Joi.object({
  name: Joi.string().required().error(createError.BadRequest('name in invalid')),
  value: Joi.string().required().error(createError.BadRequest('value in invalid')),
  disabled: Joi.boolean().required().error(createError.BadRequest('disabled in invalid'))
})
