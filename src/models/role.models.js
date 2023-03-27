import { Schema, Types, model } from 'mongoose'

const RoleSchema = new Schema(
  {
    title: { type: String, require: true, unique: true },
    description: { type: String, default: '' },
    permissions: { type: [Types.ObjectId], default: [], ref: 'permission' },
  },
  {
    versionKey: false,
  }
)

export default model('role', RoleSchema)
