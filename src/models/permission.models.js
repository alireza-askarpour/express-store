import { Schema, model } from 'mongoose'

const PermissionSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
  },
  {
    versionKey: false,
  }
)

export default model('permission', PermissionSchema)
