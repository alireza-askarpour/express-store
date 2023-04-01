import JWT from 'jsonwebtoken'
import createError from 'http-errors'

import UserModel from '../models/user.models.js'

export const verifyAccessToken = (req, res, next) => {
  if (!req?.headers?.authorization) {
    return next(createError.Unauthorized())
  }

  const [bearer, token] = req?.headers?.authorization?.split(' ') || []

  if (!token && !['Bearer', 'bearer'].includes(bearer)) {
    return next(createError.Unauthorized())
  }

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err) return next(createError.Unauthorized('asdasd'))
      const user = await UserModel.findOne(
        { email: payload.email },
        { password: 0 }
      )
      if (!user) return next(createError.Unauthorized())
      req.user = user
      next()
  })
}
