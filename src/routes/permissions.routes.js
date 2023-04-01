import express from 'express'

import PermissionsController from '../controllers/permissions.controller.js'
import { verifyAccessToken } from '../middlewares/authorization.middleware.js'

const router = express.Router()

router.get('/list', verifyAccessToken, PermissionsController.getPermissions)
router.post(
  '/create',
  verifyAccessToken,
  PermissionsController.createPermission
)
router.patch(
  '/update/:id',
  verifyAccessToken,
  PermissionsController.updatePermission
)
router.delete(
  '/remove/:id',
  verifyAccessToken,
  PermissionsController.removePermission
)

export default router
