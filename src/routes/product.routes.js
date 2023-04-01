import express from 'express'

import ProductController from '../controllers/products.controller.js'

import { uploadImage } from '../middlewares/upload.middleware.js'
import { stringToArray } from '../middlewares/stringToArray.middleware.js'
import { verifyAccessToken } from '../middlewares/authorization.middleware.js'
import { checkPermission } from '../middlewares/permission.guard.js'
import { PERMISSIONS } from '../constants/RBACK.constant.js'

const router = express.Router()

router.get('/list', ProductController.getProducts)
router.get('/:id', ProductController.getProduct)

router.post(
  '/create',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  uploadImage.array('images', 10),
  stringToArray('tags', 'colors'),
  ProductController.createProduct
)

router.patch(
  '/update/:id',
  verifyAccessToken,
  checkPermission([PERMISSIONS.ADMIN]),
  uploadImage.array('images', 10),
  stringToArray('tags', 'colors'),
  ProductController.updateProduct
)

export default router
