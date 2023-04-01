import express from 'express'

import AccountsController from '../controllers/accounts.controller.js'

const router = express.Router()

router.post('/signup', AccountsController.signup)
router.post('/login', AccountsController.login)
router.post('/refresh-token', AccountsController.refreshToken)

export default router
