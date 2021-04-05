import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const jwt = require('jsonwebtoken');
require("dotenv-safe").config()

export default class Jwt {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const token = request.header('authorization')
    if (!token) return response.status(401).json({ message: 'No token provided' ,token:request.header('x-access-token')})
    const tokenSanitized = token.replace('Bearer ','');
    jwt.verify(tokenSanitized,process.env.APP_KEY,function(err){
      if(err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.'})
    })
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
