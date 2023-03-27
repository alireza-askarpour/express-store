import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import CategoryModel from '../models/category.models.js'

import {
  createCategoryValidation,
  updateategoryValidation,
} from '../validations/category.validation.js'
import { objectIDValidation } from '../validations/public.validation.js'

class CategoryClass extends Controller {
  async createCategory(req, res, next) {
    try {
      const { name, value } = await createCategoryValidation.validateAsync(
        req.body
      )

      const existCategory = await CategoryModel.findOne({ name })
      if (existCategory) throw createError.BadRequest('slug already existed')

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

  async updateCategory(req, res, next) {
    const { id } = req.params
    try {
      const { _id } = await this.checkExistCategory(id)
      const { name, value } = await updateategoryValidation.validateAsync(
        req.body
      )

      const existCategory = await CategoryModel.findOne({ name })
      if (existCategory) throw createError.BadRequest('slug already existed')

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

  async checkExistCategory(categoryId) {
    const { id } = await objectIDValidation.validateAsync({ id: categoryId })
    const category = await CategoryModel.findById(id)
    if (!category) throw createError.NotFound('not found category')
    return category
  }
}

export default new CategoryClass()
