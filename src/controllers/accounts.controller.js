import bcrypt from 'bcrypt'
import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import UserModel from '../models/user.models.js'

import { hashString } from '../utils/hashString.utils.js'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/token.utils.js'
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
      const refreshToken = await signRefreshToken({ email })

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
        refreshToken,
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
      const refreshToken = await signRefreshToken({ email })

      res.status(StatusCodes.CREATED).json({
        success: true,
        status: StatusCodes.CREATED,
        accessToken,
        refreshToken,
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Get new access-token and refresh-token
   */
  async refreshToken(req, res, next) {
    const { refreshToken } = req.body
    try {
      const email = await verifyRefreshToken(refreshToken)
      const user = await UserModel.findOne({ email })

      const accessToken = await signAccessToken({ email: user.email })
      const newRefreshToken = await signRefreshToken({ email: user.email })

      res.status(StatusCodes.OK).json({
        success: true,
        status: StatusCodes.OK,
        accessToken,
        refreshToken: newRefreshToken,
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Get logged in user
   */
  async getMe(req, res, next) {
    try {
      if (!req?.user) return createError.Unauthorized('USER_UNAUTHORIZED')

      const userId = req.user._id
      const user = await UserModel.findById(userId, { password: 0 })

      res.status(StatusCodes.OK).json({
        success: true,
        status: StatusCodes.OK,
        message: 'USER_FETCHED',
        user,
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new AccountController()
