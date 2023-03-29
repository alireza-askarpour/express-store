import { Schema, model } from 'mongoose'

const UserSchem = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String, unique: true },
    password: {
      type: String,
      lowercase: true,
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
