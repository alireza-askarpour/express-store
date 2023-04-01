import Joi from 'joi'
import createError from 'http-errors'

export const createPermissionSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().error(createError.BadRequest('permission is not correct')),
  description: Joi.string().min(0).max(100).required().error(createError.BadRequest('description is not correct')),
})
