import express from 'express'

import PermissionsController from '../controllers/permissions.controller.js'

const router = express.Router()

router.get('/list', PermissionsController.getPermissions)
router.post('/create', PermissionsController.createPermission)
router.patch('/update/:id', PermissionsController.updatePermission)
router.delete('/remove/:id', PermissionsController.removePermission)

export default router
