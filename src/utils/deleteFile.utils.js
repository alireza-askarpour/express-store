import fs from 'fs'
import path from 'path'
import { __dirname } from '../../__dirname.js'

export const deleteFile = async fileAddress => {
  const pathFiles = Array.isArray(fileAddress)
    ? fileAddress.map(address => path.join(__dirname, address))
    : [path.join(__dirname, fileAddress)]

  const deletePromises = pathFiles.map(
    pathFile =>
      new Promise(resolve => {
        if (fs.existsSync(pathFile)) {
          fs.unlink(pathFile, err => {})
        }
        resolve()
      })
  )

  await Promise.all(deletePromises)
}
