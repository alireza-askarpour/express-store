import express from 'express'

import CategoryController from '../controllers/categories.controller.js'

const router = express.Router()

router.get('/list', CategoryController.getCategories)
router.post('/create', CategoryController.createCategory)
router.patch('/update/:id', CategoryController.updateCategory)
router.delete('/remove/:id', CategoryController.removeCategory)

router.patch('/subcategories/create/:id', CategoryController.createSubcategory)

export default router
