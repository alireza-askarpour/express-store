import bcrypt from 'bcrypt'
import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import UserModel from '../models/user.models.js'

import { hashString } from '../utils/hashString.utils.js'
import { signAccessToken } from '../utils/token.utils.js'
import {
  loginValidation,
  signupValidation,
} from '../validations/user.validation.js'

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

      const duplicateEmail = await UserModel.findOne({ email })
      if (duplicateEmail) throw createError.BadRequest('Email already exists')

      const createdAccount = await UserModel.create({
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

  /**
   * login user with email and password
   */
  async login(req, res, next) {
    try {
      const { email, password } = await loginValidation.validateAsync(req.body)

      const user = await UserModel.findOne({ email })
      if (!user) throw createError.NotFound('USER_NOT_EXISTS')

      const comparedPassword = bcrypt.compareSync(password, user.password)
      if (!comparedPassword) {
        throw createError.Unauthorized('The username or password is incorrect')
      }

      const accessToken = await signAccessToken({ email })

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
