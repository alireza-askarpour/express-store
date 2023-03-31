import Joi from 'joi'
import createError from 'http-errors'

import { MONGO_ID_PATTERN } from '../constants/pattern.constant.js'

export const createProductValidation = Joi.object({
  title: Joi.string().min(3).max(50).required().error(createError.BadRequest('Title of the product is not correct')),
  description: Joi.string().required().error(createError.BadRequest('Description sent is not correct')),
  tags: Joi.array().min(0).max(20).required().error(createError.BadRequest('Tags cannot be more than 20 items')),
  colors: Joi.array().min(0).max(20).error(createError.BadRequest('Selected colors can be more than 20 items')),
  category: Joi.string().pattern(MONGO_ID_PATTERN).required().error(createError.BadRequest('Desired category was not found')),
  price: Joi.number().required().error(createError.BadRequest('Entered price is not correct')),
  discount: Joi.number().required().error(createError.BadRequest('Entered discount is not correct')),
  count: Joi.number().required().error(createError.BadRequest('Entered number is not correct')),
  width: Joi.number().allow(null, 0).error(createError.BadRequest("Entered width is not correct")),
  height: Joi.number().allow(null, 0).error(createError.BadRequest("Entered height is not correct")),
  length: Joi.number().allow(null, 0).error(createError.BadRequest("Entered length is not correct")),
  weight: Joi.number().allow(null, 0).error(createError.BadRequest("Entered weight is not correct")),
  model: Joi.string().error(createError.BadRequest('Entered model is not correct')),
  madein: Joi.string().error(createError.BadRequest('Entered madein is not correct')),
})

export const updateProductValidation = Joi.object({
  title: Joi.string().min(3).max(50).error(createError.BadRequest('Title of the product is not correct')),
  description: Joi.string().error(createError.BadRequest('Description sent is not correct')),
  tags: Joi.array().min(0).max(20).error(createError.BadRequest('Tags cannot be more than 20 items')),
  colors: Joi.array().min(0).max(20).error(createError.BadRequest('Selected colors can be more than 20 items')),
  category: Joi.string().pattern(MONGO_ID_PATTERN).error(createError.BadRequest('Desired category was not found')),
  price: Joi.number().error(createError.BadRequest('Entered price is not correct')),
  discount: Joi.number().error(createError.BadRequest('Entered discount is not correct')),
  count: Joi.number().error(createError.BadRequest('Entered number is not correct')),
  width: Joi.number().allow(null, 0).error(createError.BadRequest("Entered width is not correct")),
  height: Joi.number().allow(null, 0).error(createError.BadRequest("Entered height is not correct")),
  length: Joi.number().allow(null, 0).error(createError.BadRequest("Entered length is not correct")),
  weight: Joi.number().allow(null, 0).error(createError.BadRequest("Entered weight is not correct")),
  model: Joi.string().error(createError.BadRequest('Entered model is not correct')),
  madein: Joi.string().error(createError.BadRequest('Entered madein is not correct')),
})
