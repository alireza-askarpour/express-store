import { Schema, model } from 'mongoose'

const SubcategorySchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  { versionKey: false }
)

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    subcategories: [SubcategorySchema],
  },
  {
    versionKey: false,
  }
)

export default model('category', CategorySchema)
