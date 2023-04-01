import express from 'express'
import UserController from '../controllers/user.controller.js'
import { verifyAccessToken } from '../middlewares/authorization.middleware.js'

const router = express.Router()

router.get('/list', verifyAccessToken, UserController.getUsers)

export default router
