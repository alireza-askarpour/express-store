import express from 'express'

import CategoryClass from '../controllers/categories.controller.js'

const router = express.Router()

router.post('/create', CategoryClass.createCategory)
router.patch('/update/:id', CategoryClass.updateCategory)

export default router
