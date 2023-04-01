import express from 'express'

import AccountsController from '../controllers/accounts.controller.js'
import { verifyAccessToken } from '../middlewares/authorization.middleware.js'

const router = express.Router()

router.post('/signup', AccountsController.signup)
router.post('/login', AccountsController.login)
router.post('/refresh-token', AccountsController.refreshToken)
router.get('/me', verifyAccessToken, AccountsController.getMe)

export default router
