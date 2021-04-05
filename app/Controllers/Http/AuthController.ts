// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
require("dotenv-safe").config()
const jwt = require('jsonwebtoken');
export default class AuthController  {

  public async login({request,response}: HttpContextContract){
    const data = request.only(['email','password'])
    const user = await User.findBy('email',data.email)
    if (!user){
      return response.status(404).json({message:'email or password is invalid'})
    }
    const hash = await Hash.verify(user.password,data.password)
    if (hash){
      const id = user.id; //esse id viria do banco de dados

      const token = jwt.sign({id},process.env.APP_KEY,{
        expiresIn: 300000 // expires in 5min
      })
      return response.status(200).json({auth: true, token: token, user: user})
    }
    return response.status(404).json({message:'email or password is invalid'})

  }

  public async confirmEmail({response,params,request}:HttpContextContract){
    if (!request.hasValidSignature()) {
      return 'Url is not valid'
    }
    const token = params.token;
    const user = await User.findBy('confirm_email_token',token);
    if (!user){
     return  response.status(404).json({message:'User not find'});
    }
    if (user.email_confimed){
     return  response.ok({message:'email already confirmed'});
    }
    user.email_confimed = 1
    await user.save();
    response.ok({data:user,message:'Email confirmed successfully'});
  }
}
