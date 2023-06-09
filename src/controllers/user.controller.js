import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import UserModel from '../models/user.models.js'
import { objectIDValidation } from '../validations/public.validation.js'

class UserController extends Controller {
  /**
   * Get all users
   */
  async getUsers(req, res, next) {
    const { search } = req.query
    try {
      const users = await UserModel.find(
        search ? { $text: { $search: search } } : {}
      )
      if (!users) {
        throw createError.InternalServerError(
          'The list of users was not received'
        )
      }
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        success: true,
        users,
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Get user by ID
   */
  async getUser(req, res, next) {
    const { id } = req.params
    try {
      const { id: userId } = await objectIDValidation.validateAsync({ id })

      const user = await UserModel.findById(userId)
      if (!user) throw createError.InternalServerError('USER_NOT_RECEIVED')

      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true,
        user,
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Remove a user by ID
   */
  async removeUser(req, res, next) {
    const { id } = req.params
    try {
      const { id: userId } = await objectIDValidation.validateAsync({ id })

      const removedUserResult = await UserModel.deleteOne({ _id: userId })
      if (removedUserResult.deletedCount == 0) {
        throw createError.InternalServerError('The user could not be deleted')
      }

      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true,
        message: 'USER_DELETED_SUCCESS',
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new UserController()
