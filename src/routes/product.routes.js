import express from 'express'

import ProductController from '../controllers/products.controller.js'

import { uploadImage } from '../middlewares/upload.middleware.js'
import { stringToArray } from '../middlewares/stringToArray.middleware.js'

const router = express.Router()

router.get('/list', ProductController.getProducts)
router.get('/:id', ProductController.getProduct)

router.post(
  '/create',
  uploadImage.array('images', 10),
  stringToArray('tags', 'colors'),
  ProductController.createProduct
)

router.patch(
  '/update/:id',
  uploadImage.array('images', 10),
  stringToArray('tags', 'colors'),
  ProductController.updateProduct
)

export default router
