import express from 'express'

import CategoryController from '../controllers/categories.controller.js'

import { checkPermission } from '../middlewares/permission.guard.js'
import { PERMISSIONS } from '../constants/RBACK.constant.js'
import { verifyAccessToken } from '../middlewares/authorization.middleware.js'

const router = express.Router()

router.get('/list', CategoryController.getCategories)
router.post(
  '/create',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.createCategory
)
router.patch(
  '/update/:id',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.updateCategory
)
router.delete(
  '/remove/:id',
  checkPermission([PERMISSIONS.ADMIN]),
  verifyAccessToken,
  CategoryController.removeCategory
)

router.patch(
  '/subcategories/create/:categoryId',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.createSubcategory
)
router.patch(
  '/subcategories/update/:id',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.updateSubcategory
)
router.patch(
  '/subcategories/remove/:id',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  CategoryController.removeSubcategory
)

export default router
