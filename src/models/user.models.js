import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, min: 8 },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
  },
  { timestamps: true, versionKey: false }
)

UserSchema.index({ fullname: 'text', email: 'text' })

export default model('User', UserSchema)
