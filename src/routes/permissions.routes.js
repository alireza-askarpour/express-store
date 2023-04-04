import express from 'express'

import PermissionsController from '../controllers/permissions.controller.js'

const router = express.Router()

router.get('/', PermissionsController.getPermissions)
router.post('/', PermissionsController.createPermission)
router.patch('/:id', PermissionsController.updatePermission)
router.delete('/:id', PermissionsController.removePermission)

export default router
