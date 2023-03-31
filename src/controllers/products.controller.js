import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import ProductModel from '../models/product.models.js'

import { setFeatures } from '../utils/setFeatures.js'
import { deleteFile } from '../utils/deleteFile.utils.js'
import { createProductValidation } from '../validations/product.validation.js'
import { listOfImagesFromRequest } from '../utils/listOfImagesFromRequest.utils.js'

class ProductController extends Controller {
  async createProduct(req, res, next) {
    try {
      if (!req?.body?.tags) req.body.tags = []
      if (!req?.body?.colors) req.body.colors = []

      const productBody = await createProductValidation.validateAsync(req.body)

      const {
        title,
        description,
        tags,
        colors,
        category,
        price,
        discount,
        count,
      } = productBody

      const images = listOfImagesFromRequest(req?.files)
      const feathers = setFeatures(productBody)
      const supplier = '64185b4ac2da05110733cbfd'

      const product = {
        images,
        supplier,
        title,
        description,
        tags,
        colors,
        category,
        price,
        discount,
        count,
        feathers,
      }

      const createdProduct = await ProductModel.create(product)
      if (!createdProduct) {
        throw createError.InternalServerError('PRODUCT_NOT_CREATED')
      }

      res.status(StatusCodes.CREATED).json({
        success: true,
        status: StatusCodes.CREATED,
        message: 'PRODUCT_CREATED_SUCCESS',
      })
    } catch (err) {
      const images = listOfImagesFromRequest(req?.files)
      await deleteFile(images)
      next(err)
    }
  }
}

export default new ProductController()
