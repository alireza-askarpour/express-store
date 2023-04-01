import express from 'express'

import accountsRoutes from './accounts.routes.js'
import categoriesRoutes from './categories.routes.js'
import productsRoutes from './product.routes.js'
import usersRoutes from './users.routes.js'

const router = express.Router()

router.use('/accounts', accountsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/products', productsRoutes)
router.use('/users', usersRoutes)

export default router
