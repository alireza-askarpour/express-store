import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import PermissionModel from '../models/permission.models.js'

import { createPermissionSchema } from '../validations/permission.validation.js'

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

  /**
   * Create new permission
   */
  async createPermission(req, res, next) {
    try {
      const { name, description } = await createPermissionSchema.validateAsync(
        req.body
      )

      const permission = await PermissionModel.findOne({ name })
      if (permission)
        throw createHttpError.BadRequest('Access has already been existed')

      const permissionResult = await PermissionModel.create({
        name,
        description,
      })
      if (!permissionResult)
        throw createHttpError.InternalServerError('Permission was not granted')

      res.status(StatusCodes.CREATED).json({
         success: true,
        status: StatusCodes.CREATED,
        message: 'Permission was successfully established',
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new PermissionsController()
