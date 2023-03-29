import express from 'express'

import accountsRoutes from './accounts.routes.js'
import categoriesRoutes from './categories.routes.js'

const router = express.Router()

router.use('/accounts', accountsRoutes)
router.use('/categories', categoriesRoutes)

export default router
