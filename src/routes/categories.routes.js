import express from 'express'

import CategoryController from '../controllers/categories.controller.js'

import { checkPermission } from '../middlewares/permission.guard.js'
import { PERMISSIONS } from '../constants/RBACK.constant.js'
import { verifyAccessToken } from '../middlewares/authorization.middleware.js'

const router = express.Router()

router.get('/', CategoryController.getCategories)
router.post(
  '/',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.createCategory
)
router.patch(
  '/:id',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.updateCategory
)
router.delete(
  '/:id',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.removeCategory
)

router.patch(
  '/sub/:categoryId',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.createSubcategory
)
router.patch(
  '/sub/update/:id',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.updateSubcategory
)
router.patch(
  '/sub/remove/:id',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.removeSubcategory
)

export default router
