import express from 'express'

import ProductController from '../controllers/products.controller.js'

import { uploadImage } from '../middlewares/upload.middleware.js'
import { stringToArray } from '../middlewares/stringToArray.middleware.js'

const router = express.Router()

router.post(
  '/create',
  uploadImage.array('images', 10),
  stringToArray('tags', 'colors'),
  ProductController.createProduct
)

export default router
