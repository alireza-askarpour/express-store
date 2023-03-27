import fs from 'fs'
import path from 'path'

import multer from 'multer'
import createError from 'http-errors'

import { nanoid, alphabetLowerCaseLetters } from '../config/nanoid.config.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/products'
    fs.mkdirSync(dir, { recursive: true })
    return cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      nanoid(alphabetLowerCaseLetters, 16) + path.extname(file.originalname)
    )
  },
})
console.log('a');
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname)
  const types = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  if (types.includes(ext)) return cb(null, true)
  return cb(createError.BadRequest('The submitted image format is not correct'))
}

const imageMaxSize = 1 * 1000 * 1000 // 1MB

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: imageMaxSize },
})
