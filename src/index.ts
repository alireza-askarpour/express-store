import dotenv from 'dotenv'
import createError from 'http-errors'
import swaggerUI from 'swagger-ui-express'
import express, { Express, NextFunction, Request, Response } from 'express'

import connectDB from './config/database.config.js'
import { appErrorHandler, appListener } from './config/app.config.js'

import { morganMiddleware } from './middlewares/morgan.middleware.js'
import { swaggerSetup } from './config/swagger.config.js'

// Config
dotenv.config()
connectDB()

const app: Express = express()

// Settings
app.use('/docs', swaggerUI.serve, swaggerSetup)

// Middlewares
app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

// Error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound(`Can't find ${req.originalUrl} on the server!`))
})

app.use(appErrorHandler)

app.listen(process.env.PORT, appListener)
