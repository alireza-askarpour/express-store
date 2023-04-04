import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import Controller from './controller.js'
import CategoryModel from '../models/category.models.js'

import { objectIDValidation } from '../validations/public.validation.js'
import {
  createCategoryValidation,
  createSubcategoryValidation,
  updateategoryValidation,
  updateSubcategoryValidation,
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
   * create subcategory by categoryId
   */
  async createSubcategory(req, res, next) {
    const { categoryId } = req.params
    try {
      const { _id } = await this.checkExistCategory(categoryId)
      const { name, value, disabled } =
        await createSubcategoryValidation.validateAsync(req.body)

      const existCategory = await CategoryModel.findOne({
        'subcategories.name': name,
      })

      if (existCategory) {
        throw createError.BadRequest('Subcategory already existed')
      }

      const createdSubcategory = await CategoryModel.updateOne(
        { _id },
        {
          $push: {
            subcategories: { name, value, disabled },
          },
        }
      )

      if (createdSubcategory.modifiedCount == 0) {
        throw createError.InternalServerError('Subcategory not created')
      }

      res.status(StatusCodes.OK).json({
        success: true,
        status: StatusCodes.OK,
        message: 'Category created successfully',
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * update subcategory by subcategory Id
   */
  async updateSubcategory(req, res, next) {
    const { id: subcategoryId } = req.params
    try {
      // validation of sent ID
      const { id } = await objectIDValidation.validateAsync({
        id: subcategoryId,
      })

      // validation of sent subcategory data
      const subcategoryDataBody =
        await updateSubcategoryValidation.validateAsync(req.body)

      // checking the availability of the subcategory with the submitted ID
      const existSubategory = await CategoryModel.findOne(
        {
          'subcategories._id': id,
        },
        { 'subcategories.$': 1 }
      )

      if (!existSubategory) {
        throw createError.NotFound('No subcategory found with this ID')
      }

      // checking for non duplication of subcategories
      const duplicateSubategory = await CategoryModel.findOne(
        {
          'subcategories.name': subcategoryDataBody.name,
        },
        { 'subcategories.$': 1 }
      )

      if (duplicateSubategory) {
        throw createError.NotFound('Subcategory already existed')
      }

      // update update subcategory
      const updatedSubcategory = await CategoryModel.updateOne(
        { 'subcategories._id': id },
        {
          $set: { 'subcategories.$': subcategoryDataBody },
        }
      )

      if (updatedSubcategory.modifiedCount == 0) {
        throw createError.InternalServerError('Subcategory not updated')
      }

      res.status(StatusCodes.OK).json({
        success: true,
        status: StatusCodes.OK,
        message: 'Category updated successfully',
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * remove a subcategory by ID
   */
  async removeSubcategory(req, res, next) {
    const { id } = req.params
    try {
      await this.getOneSubcategory(id)

      const removedSubcategory = await CategoryModel.updateOne(
        { 'subcategories._id': id },
        {
          $pull: {
            subcategories: {
              _id: id,
            },
          },
        }
      )

      if (removedSubcategory.modifiedCount == 0) {
        throw createError.InternalServerError(
          'subcategory deletion was not done'
        )
      }

      return res.status(StatusCodes.OK).json({
        success: true,
        status: StatusCodes.OK,
        message: 'Remove the subcategory successfully',
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

  /**
   * get one subcategory by subcategoryId
   */
  async getOneSubcategory(subcategoryId) {
    const { id } = await objectIDValidation.validateAsync({ id: subcategoryId })

    const subcategory = await CategoryModel.findOne(
      { 'subcategories._id': id },
      { 'subcategories.$': 1 }
    )

    if (!subcategory) {
      throw createError.NotFound('No subcategory found with this ID.')
    }

    return subcategory
  }
}

export default new CategoryClass()
