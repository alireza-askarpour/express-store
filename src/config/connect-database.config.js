import mongoose from 'mongoose'

export class ConnectToMongoDB {
  #MONGO_URI

  constructor(MONGO_URI) {
    console.log(MONGO_URI)
    this.#MONGO_URI = MONGO_URI
  }

  async connect() {
    mongoose.set('strictQuery', false)

    mongoose.connect(this.#MONGO_URI)

    mongoose.connection.on('connected', () => {
      console.log('✅ —> Mongoose connected to DB')
    })

    mongoose.connection.on('disconnected', () => {
      console.log('❌ —> Mongoose disconnected!')
    })

    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      process.exit(0)
    })
  }
}
