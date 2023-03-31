import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import ProductModel from '../models/product.models.js'

import { setFeatures, updateFeatures } from '../utils/setFeatures.js'
import { deleteFile } from '../utils/deleteFile.utils.js'
import { listOfImagesFromRequest } from '../utils/listOfImagesFromRequest.utils.js'

import { objectIDValidation } from '../validations/public.validation.js'
import {
  createProductValidation,
  updateProductValidation,
} from '../validations/product.validation.js'

class ProductController extends Controller {
  async getProducts(req, res, next) {
    const { search } = req.query
    try {
      const products = await ProductModel.find(
        search ? { $text: { $search: search } } : {}
      )

      if (!products) {
        throw createError.InternalServerError('PRODUCTS_NOT_RECEIVED')
      }

      res.status(StatusCodes.OK).json({
        success: true,
        status: StatusCodes.OK,
        products,
      })
    } catch (err) {
      next(err)
    }
  }

  async getProduct(req, res, next) {
    const { id } = req.params
    try {
      const product = await this.findProductById(id)

      res.status(StatusCodes.OK).json({
        success: true,
        status: StatusCodes.OK,
        product,
      })
    } catch (err) {
      next(err)
    }
  }

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
      const features = setFeatures(productBody)
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
        features,
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

  async updateProduct(req, res, next) {
    const { id } = req.params
    try {
      const product = await this.findProductById(id)
      const productData = await updateProductValidation.validateAsync(req.body)
      const features = updateFeatures(req.body)

      if (req?.files) {
        const images = listOfImagesFromRequest(req?.files)
        productData.images = images
      }

      const updatedProduct = await ProductModel.updateOne(
        { _id: product._id },
        { $set: { ...productData, features } }
      )
      if (!updatedProduct) {
        throw createError.InternalServerError('PRODUCT_NOT_UPDATED')
      }

      if (req?.files) {
        await deleteFile(product.images)
      }

      res.status(StatusCodes.CREATED).json({
        success: true,
        status: StatusCodes.CREATED,
        message: 'PRODUCT_UPDATED_SUCCESS',
      })
    } catch (err) {
      const images = listOfImagesFromRequest(req?.files)
      await deleteFile(images)
      next(err)
    }
  }

  async findProductById(productId) {
    const { id } = await objectIDValidation.validateAsync({ id: productId })
    const product = await ProductModel.findById(id)
    if (!product) throw createError.NotFound('NOT_FOUND_PRODUCT')
    return product
  }
}

export default new ProductController()
