import { Schema, Types, model } from 'mongoose'

import { CommentSchema } from './public.schema.js'

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, required: true },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [Types.ObjectId], ref: 'user', default: [] },
    deslikes: { type: [Types.ObjectId], ref: 'user', default: [] },
    bookmarks: { type: [Types.ObjectId], ref: 'user', default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    supplier: { type: Types.ObjectId, ref: 'user', required: true },
    count: { type: String, default: 0 },
    features: {
      type: Object,
      default: {
        width: 0,
        height: 0,
        length: 0,
        weight: 0,
        colors: [],
        model: '',
        madein: '',
      },
    },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
)

export default model('product', ProductSchema)
