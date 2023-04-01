import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import PermissionModel from '../models/permission.models.js'

class PermissionsController extends Controller {
  /**
   * Get all permissions
   */
  async getPermissions(req, res, next) {
    try {
      const permissions = await PermissionModel.find()

      if (!permissions) {
        throw createHttpError.InternalServerError('PERMISSIONS_NOT_RECEIVED')
      }

      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true,
        permissions,
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new PermissionsController()
