import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import CategoryModel from '../models/category.models.js'

import { createCategoryValidation } from '../validations/category.validation.js'

class CategoryClass extends Controller {
  async createCategory(req, res, next) {
    try {
      const { name, value } = await createCategoryValidation.validateAsync(
        req.body
      )

      const existCategory = await CategoryModel.findOne({ name })
      if (existCategory) throw createError.BadRequest('slug already existed')

      const categoryResult = await CategoryModel.create({ name, value })
      if (!categoryResult)
        throw createError.InternalServerError('category not created')

      res.status(StatusCodes.CREATED).json({
        success: true,
        status: StatusCodes.CREATED,
        message: 'category created successfully',
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new CategoryClass()
