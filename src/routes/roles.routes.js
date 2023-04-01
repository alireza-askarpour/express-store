import express from 'express'

import RolesController from '../controllers/roles.controller.js'

import { verifyAccessToken } from '../middlewares/authorization.middleware.js'

const router = express.Router()

router.get('/list', verifyAccessToken, RolesController.getRoles)

export default router
