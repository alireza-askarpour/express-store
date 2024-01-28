import mongoose from 'mongoose'
import { ConnectToMongoDB } from '../../src/config/connect-database.config.js'

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  set: jest.fn(),
  connection: {
    on: jest.fn(),
    close: jest.fn(),
  },
}))

describe('ConnectToMongoDB', () => {
  const MONGO_URI = 'mongodb://localhost:27017'
  let dbConnector

  beforeAll(() => {
    dbConnector = new ConnectToMongoDB(MONGO_URI)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should connect to MongoDB', async () => {
    await dbConnector.connect()

    expect(mongoose.set).toHaveBeenCalledWith('strictQuery', false)
    expect(mongoose.connect).toHaveBeenCalledWith(MONGO_URI)
  })

  it('should log when successfully connected', async () => {
    await dbConnector.connect()

    const connectedCallback = mongoose.connection.on.mock.calls.find(
      call => call[0] === 'connected'
    )[1]
    const logSpy = jest.spyOn(console, 'log')
    connectedCallback()

    expect(logSpy).toHaveBeenCalledWith('✅ —> Mongoose connected to DB')
  })

  it('should log when disconnected', async () => {
    await dbConnector.connect()

    const disconnectedCallback = mongoose.connection.on.mock.calls.find(
      call => call[0] === 'disconnected'
    )[1]
    const logSpy = jest.spyOn(console, 'log')
    disconnectedCallback()

    expect(logSpy).toHaveBeenCalledWith('❌ —> Mongoose disconnected!')
  })
})
