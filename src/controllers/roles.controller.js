import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import RoleModel from '../models/role.models.js'

class RoleController extends Controller {
  /**
   * Get roles list
   */
  async getRoles(req, res, next) {
    try {
      const roles = await RoleModel.find()
      if (!roles)
        throw createHttpError.InternalServerError('ROLES_NOT_RECEIVED')

      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true,
        roles,
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new RoleController()
