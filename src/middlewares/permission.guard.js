import createError from 'http-errors'

import RoleModel from '../models/role.models.js'
import PermissionsModel from '../models/permission.models.js'

import { PERMISSIONS } from '../constants/RBACK.constant.js'

export const checkPermission = (requiredPermissions = []) => {
  return async (req, res, next) => {
    try {
      const allPermissions = requiredPermissions.flat(2)
      const role = await RoleModel.findOne({ title: req.user.role })

      const permissions = await PermissionsModel.find({
        _id: { $in: role?.permissions },
      })

      const userPermissions = permissions.map(item => item.name)

      const hasPermission = allPermissions.every(permission => {
        return userPermissions.includes(permission)
      })

      if (userPermissions.includes(PERMISSIONS.ADMIN)) return next()
      if (allPermissions.length == 0 || hasPermission) return next()

      throw createError.Forbidden('You do not have access to this section')
    } catch (error) {
      next(error)
    }
  }
}
