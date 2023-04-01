import path from 'path'
import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { __dirname } from '../../__dirname.js'

const router = express.Router()
const dir = path.join(__dirname, 'src', 'pages', 'home.html')

router.get('/', (req, res) => res.status(StatusCodes.OK).sendFile(dir))

export default router
