import http from 'http'
import dotenv from 'dotenv'
import express from 'express'
import createError from 'http-errors'
import swaggerUI from 'swagger-ui-express'

import allRoutes from './routes/index.routes.js'
import { swaggerSetup } from './config/swagger.config.js'
import { appErrorHandler, appListener } from './config/app.config.js'
import { morganMiddleware } from './middlewares/morgan.middleware.js'
import { ConnectToMongoDB } from './config/connect-database.config.js'

class Application {
  #app = express()
  #MONGO_URI
  #PORT

  constructor(PORT, MONGO_URI) {
    this.#PORT = PORT
    this.#MONGO_URI = MONGO_URI
    const db = new ConnectToMongoDB(MONGO_URI)

    this.configApplication()
    this.createServer()
    db.connect()
    this.createRoutes()
    this.errorHandling()
  }

  configApplication() {
    dotenv.config()
    this.#app.use(morganMiddleware)
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({ extended: true }))
    this.#app.use('/uploads', express.static('uploads'))
    this.#app.use('/docs', swaggerUI.serve, swaggerSetup)
  }

  createServer() {
    const server = http.createServer(this.#app)
    server.listen(this.#PORT, appListener)
  }

  createRoutes() {
    this.#app.use(allRoutes)
  }

  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound(`Can't find ${req.originalUrl} on the server!`))
    })
    this.#app.use(appErrorHandler)
  }
}

export default Application
