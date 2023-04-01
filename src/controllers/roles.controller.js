import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import RoleModel from '../models/role.models.js'

import { createRoleSchema, updateRoleSchema } from '../validations/role.validation.js'
import mongoose from 'mongoose'

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
      if (!req?.body?.permissions) req.body.permissions = []

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

  /**
   * Update role by ID
   */
  async updateRole(req, res, next) {
    const { id } = req.params
    try {
      const { _id } = await this.findRoleWithIdOrTitle(id)

      if (req?.body?.permissions) {
        const permissions = req.body.permissions.split(',')
        req.body.permissions = permissions
      }

      const roleDataBody = await updateRoleSchema.validateAsync(req.body)

      const updateRoleResult = await RoleModel.updateOne(
        { _id },
        { $set: roleDataBody }
      )

      if (!updateRoleResult.modifiedCount) {
        throw createHttpError.InternalServerError('ROLE_NOT_EDITED')
      }

      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true,
        message: 'ROLE_UPDATED_SUCCESS',
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Find role with Id or title
   */
  async findRoleWithIdOrTitle(field) {
    const findQuery = mongoose.isValidObjectId(field)
      ? { _id: field }
      : { title: field }

    const role = await RoleModel.findOne(findQuery)
    if (!role) throw createHttpError.NotFound('ROLE_NOT_FOUND')

    return role
  }
}

export default new RoleController()
