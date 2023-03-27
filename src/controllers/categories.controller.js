import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import CategoryModel from '../models/category.models.js'

import { objectIDValidation } from '../validations/public.validation.js'
import {
  createCategoryValidation,
  updateategoryValidation,
} from '../validations/category.validation.js'

class CategoryClass extends Controller {
  /**
   * Get all categories
   */
  async getCategories(req, res, next) {
    try {
      const categories = await CategoryModel.find()
      if (!categories)
        throw createError.InternalServerError('categories list not received')

      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true,
        categories,
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * create category
   */
  async createCategory(req, res, next) {
    try {
      const { name, value } = await createCategoryValidation.validateAsync(
        req.body
      )

      const existCategory = await CategoryModel.findOne({ name })
      if (existCategory)
        throw createError.BadRequest('category already existed')

      const createdCategory = await CategoryModel.create({ name, value })
      if (!createdCategory)
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

  /**
   * Update a category by ID
   */
  async updateCategory(req, res, next) {
    const { id } = req.params
    try {
      const { _id } = await this.checkExistCategory(id)
      const { name, value } = await updateategoryValidation.validateAsync(
        req.body
      )

      const existCategory = await CategoryModel.findOne({ name })
      if (existCategory)
        throw createError.BadRequest('category already existed')

      const updatedCategory = await CategoryModel.updateOne(
        { _id },
        { $set: { name, value } }
      )
      if (updatedCategory.modifiedCount == 0)
        throw createError.InternalServerError('category not updated')

      res.status(StatusCodes.OK).json({
        success: true,
        status: StatusCodes.OK,
        message: 'category updated successfully',
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Remove a category by ID
   */
  async removeCategory(req, res, next) {
    const { id } = req.params
    try {
      const { _id } = await this.checkExistCategory(id)

      const deletedCategory = await CategoryModel.deleteOne({ _id })
      if (deletedCategory.deletedCount == 0) {
        throw createError.InternalServerError('category delete failed')
      }

      res.status(StatusCodes.OK).json({
        success: true,
        status: StatusCodes.OK,
        message: 'category deleted successfully',
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * check exist category by ID
   */
  async checkExistCategory(categoryId) {
    const { id } = await objectIDValidation.validateAsync({ id: categoryId })
    const category = await CategoryModel.findById(id)
    if (!category) throw createError.NotFound('not found category')
    return category
  }
}

export default new CategoryClass()
