import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import UserSchema from '../models/user.models.js'

import { hashString } from '../utils/hashString.utils.js'
import { signupValidation } from '../validations/user.validation.js'
import { signAccessToken } from '../utils/token.utils.js'

class AccountController extends Controller {
  /**
   * Signup user with fullname, email, password
   */
  async signup(req, res, next) {
    try {
      const { fullname, email, password } =
        await signupValidation.validateAsync(req.body)

      const hashedPassword = hashString(password)
      const accessToken = await signAccessToken({ email })

      const duplicateEmail = await UserSchema.findOne({ email })
      if (duplicateEmail) throw createError.BadRequest('Email already exists')

      const createdAccount = await UserSchema.create({
        fullname,
        email,
        password: hashedPassword,
      })
      if (!createdAccount) {
        throw createError.InternalServerError('Signup failed')
      }

      res.status(StatusCodes.CREATED).json({
        success: true,
        status: StatusCodes.CREATED,
        accessToken,
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new AccountController()
