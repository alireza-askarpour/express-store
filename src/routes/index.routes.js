import express from 'express'

import categoriesRoutes from './categories.routes.js'

const router = express.Router()

router.use('/categories', categoriesRoutes)

export default router
