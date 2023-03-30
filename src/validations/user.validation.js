import Joi from 'joi'
import createError from 'http-errors'

export const signupValidation = Joi.object({
   fullname: Joi.string().required().error(createError.BadRequest('fullname is invalid')),
   email: Joi.string().required().error(createError.BadRequest('email is invalid')),
   password: Joi.string().required().error(createError.BadRequest('password is invalid')),
})

export const loginValidation = Joi.object({
   email: Joi.string().required().error(createError.BadRequest('email is invalid')),
   password: Joi.string().required().error(createError.BadRequest('password is invalid')),
})
