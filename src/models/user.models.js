import { Schema, model } from 'mongoose'
import {
  nanoid,
  alphabetNumber,
  alphabetLowerCaseLetters,
} from '../config/nanoid.config.js'

const UserSchem = new Schema(
  {
    full_name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String, unique: true },
    password: {
      type: String,
      lowercase: true,
      default: nanoid(alphabetNumber + alphabetLowerCaseLetters, 10),
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model('user', UserSchem)
