import Joi from 'joi'
import createError from 'http-errors'

import { MONGO_ID_PATTERN } from '../constants/pattern.constant.js'

export const createRoleSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().error(createError.BadRequest('title is not correct')),
  description: Joi.string().min(0).max(100).required().error(createError.BadRequest('role is not correct')),
  permissions: Joi.array().items(Joi.string().pattern(MONGO_ID_PATTERN)).required().error(createError.BadRequest('permission is not correct')),
})
