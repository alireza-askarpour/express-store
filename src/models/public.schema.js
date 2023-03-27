import { Schema, Types } from 'mongoose'

export const CommentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'user', required: true },
    commecnt: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: 'comment' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
