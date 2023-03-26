import Application from './src/server.js'

new Application(process.env.PORT, process.env.MONGO_URI)
