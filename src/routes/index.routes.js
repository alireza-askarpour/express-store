import express from 'express'

import accountsRoutes from './accounts.routes.js'
import categoriesRoutes from './categories.routes.js'
import productsRoutes from './product.routes.js'
import usersRoutes from './users.routes.js'
import permissionsRoutes from './permissions.routes.js'
import rolesRoutes from './roles.routes.js'

import { checkPermission } from '../middlewares/permission.guard.js'
import { verifyAccessToken } from '../middlewares/authorization.middleware.js'

import { PERMISSIONS } from '../constants/RBACK.constant.js'

const router = express.Router()

router.use('/accounts', accountsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/products', productsRoutes)
router.use(
  '/users',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  usersRoutes
)
router.use(
  '/permissions',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  permissionsRoutes
)
router.use(
  '/roles',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  rolesRoutes
)

export default router
