import express from 'express'

import RolesController from '../controllers/roles.controller.js'

import { verifyAccessToken } from '../middlewares/authorization.middleware.js'
import { stringToArray } from '../middlewares/stringToArray.middleware.js'

const router = express.Router()

router.get('/list', verifyAccessToken, RolesController.getRoles)
router.post(
  '/create',
  verifyAccessToken,
  stringToArray('permissions'),
  RolesController.createRole
)
router.patch('/update/:id', verifyAccessToken, RolesController.updateRole)
router.delete('/remove/:field', verifyAccessToken, RolesController.removeRole)

export default router
