import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { randomString } from '@poppinss/utils'


export default class UsersController {
  public async index({response}: HttpContextContract) {
    const users = await User.query().preload('products')
    return response.ok({data:users,message:'users retrived successfully'})
  }

  public async store({request,response}: HttpContextContract) {
    const data = request.only(['email','name','password'])
    // @ts-ignore
    data.confirm_email_token = randomString(15);
    const user = await User.create(data);

    return response.json({ data: user, message: 'user created successfully' });
  }

  public async show({params,response}: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    if (!user){
      return response.status(404).json({ data: user, message: 'user not find' });

    }
    return response.ok({ data: user, message: 'user retrived successfully' })
  }

  public async update({request,params,response}: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    const data = request.only(['email','name','password'])
    user.merge(data);
    await user.save();
    return response.ok({ data: user, message: 'user updated successfully' });
  }

  public async destroy({params,response}: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    await user.softDelete();
    return response.ok({ data: user, message: 'user deleted successfully' });
  }
}
