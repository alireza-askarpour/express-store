import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import RoleModel from '../models/role.models.js'

import { createRoleSchema } from '../validations/role.validation.js'

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

  /**
   * Create new role
   */
  async createRole(req, res, next) {
    try {
      const { title, description, permissions } =
        await createRoleSchema.validateAsync(req.body)

      const role = await RoleModel.findOne({ title })
      if (role)
        throw createHttpError.BadRequest('Role has already been existed')

      const roleResult = await RoleModel.create({
        title,
        description,
        permissions,
      })
      if (!roleResult)
        throw createHttpError.InternalServerError('ROLE_WAS_NOT_GRANTED')

      res.status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        success: true,
        message: 'ROLE_CREATED_SUCCESS',
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new RoleController()
