import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import PermissionModel from '../models/permission.models.js'

import {
  createPermissionSchema,
  updatePermissionSchema,
} from '../validations/permission.validation.js'
import { objectIDValidation } from '../validations/public.validation.js'

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

  /**
   * Update permission by ID
   */
  async updatePermission(req, res, next) {
    const { id } = req.params
    try {
      const { _id } = await this.findPermissionByID(id)
      const permissionDataBody = await updatePermissionSchema.validateAsync(
        req.body
      )

      const updatePermissionResult = await PermissionModel.updateOne(
        { _id },
        { $set: permissionDataBody }
      )

      if (!updatePermissionResult.modifiedCount) {
        throw createHttpError.InternalServerError(
          'The permission was not edited'
        )
      }

      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true,
        message: 'Permission was successfully updated',
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Remove permission by ID
   */
  async removePermission(req, res, next) {
    const { id } = req.params
    try {
      const { _id } = await this.findPermissionByID(id)

      const removePermissionResult = await PermissionModel.deleteOne({ _id })

      if (!removePermissionResult.deletedCount) {
        throw createHttpError.InternalServerError(
          'The permission was not Removed'
        )
      }

      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true,
        message: 'Permission was successfully removed',
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * find permission by ID
   */
  async findPermissionByID(id) {
    const { id: permissionId } = await objectIDValidation.validateAsync({ id })
    const permission = await PermissionModel.findById(permissionId)
    if (!permission) throw createHttpError.NotFound('PERMISSION_NOT_FOUND')
    return permission
  }
}

export default new PermissionsController()
