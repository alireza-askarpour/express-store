import Joi from 'joi'
import createErorr from 'http-errors'

import { MONGO_ID_PATTERN } from '../constants/pattern.constant.js'

export const objectIDValidation = Joi.object({
  id: Joi.string()
    .pattern(MONGO_ID_PATTERN)
    .error(createErorr.BadRequest('the entered ID is not correct')),
})
