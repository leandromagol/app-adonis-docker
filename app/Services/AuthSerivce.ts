import User from 'App/Models/User'

const jwt = require('jsonwebtoken')
require('dotenv-safe').config()
export const me = async (request  ) => {

  const token = request.header('authorization').replace('Bearer ', '')
  if (token) {
    let decoded
    try {
      decoded = jwt.verify(token, process.env.SECRET)
    } catch (e) {
      return e
    }
    const userId = decoded.id
    // const user =
    if (userId) {
      return await User.findOrFail(userId)
    } else {
      return false
    }
  }
}
