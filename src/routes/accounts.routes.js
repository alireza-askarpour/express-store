import express from 'express'

import AccountsController from '../controllers/accounts.controller.js'

const router = express.Router()

router.post('/signup', AccountsController.signup)

export default router
