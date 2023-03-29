import JWT from 'jsonwebtoken'
import createError from 'http-errors'

export const signAccessToken = payload => {
  return new Promise(async (resolve, reject) => {
    const options = {
      expiresIn: '30d',
    }
    JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError('INTERNAL_SERVER_ERROR'))
      resolve(token)
    })
  })
}
