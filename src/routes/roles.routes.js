import express from 'express'

import RolesController from '../controllers/roles.controller.js'
import { stringToArray } from '../middlewares/stringToArray.middleware.js'

const router = express.Router()

router.get('/', RolesController.getRoles)
router.post('/', stringToArray('permissions'), RolesController.createRole)
router.patch('/:id', RolesController.updateRole)
router.delete('/:field', RolesController.removeRole)

export default router
