import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import  { me } from 'App/Services/AuthSerivce'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index ({request,response}: HttpContextContract) {
    let user =  await me(request);
    const product = await Product.query().where('user_id',user.id).preload('images');
    return response.ok({data:product,message:'products retrived successfully'})
  }

  public async store ({response,request}: HttpContextContract) {
    let data = request.only(['name', 'description', 'priece' , 'published_at']);
    if (typeof data.priece === 'string' ||  data.priece instanceof String){
      // @ts-ignore
      data.priece = parseFloat(data.priece);
    }
    const user = await me(request)
    if (user){
      // @ts-ignore
      data.userId = user.id
    }
    const product = await Product.create(data)
    return response.ok({data:product,message:'Product created successfully'})
  }

  public async show ({params,response}: HttpContextContract) {
    const product = await Product.findOrFail(params.id);
    if (!product){
      return response.status(404).json({ data: product, message: 'product not find' });
    }
    return response.ok({ data: product, message: 'product retrived successfully' })
  }

  public async update ({request,params,response}: HttpContextContract) {
    const product= await Product.find(params.id);
    if (!product){
      return response.status(404).json({message:'error on retrive'})
    }
    const data = request.only(['name', 'description', 'priece' , 'published_at']);
    product.merge(data);
    await product.save();
    return response.ok({ data: product, message: 'product updated successfully' });
  }

  public async destroy ({params,response}: HttpContextContract) {
    const product = await Product.findOrFail(params.id);
    await product.softDelete();
    return response.ok({ data: product, message: 'product deleted successfully' });
  }
}
