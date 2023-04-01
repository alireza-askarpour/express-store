import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import UserModel from '../models/user.models.js'

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
}

export default new UserController()
