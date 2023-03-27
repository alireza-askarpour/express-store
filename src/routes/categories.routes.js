import express from 'express'

import CategoryController from '../controllers/categories.controller.js'

const router = express.Router()

router.get('/list', CategoryController.getCategories)
router.post('/create', CategoryController.createCategory)
router.patch('/update/:id', CategoryController.updateCategory)
router.delete('/remove/:id', CategoryController.removeCategory)

router.patch('/subcategories/create/:categoryId', CategoryController.createSubcategory)
router.patch('/subcategories/update/:id', CategoryController.updateSubcategory)

export default router
