import express from 'express'

import RolesController from '../controllers/roles.controller.js'

import { stringToArray } from '../middlewares/stringToArray.middleware.js'

const router = express.Router()

router.get('/list', RolesController.getRoles)
router.post('/create', stringToArray('permissions'), RolesController.createRole)
router.patch('/update/:id', RolesController.updateRole)
router.delete('/remove/:field', RolesController.removeRole)

export default router
