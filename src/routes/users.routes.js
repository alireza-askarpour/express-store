import express from 'express'

import UserController from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUser)
router.delete('/:id', UserController.removeUser)

export default router
