import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductImage from 'App/Models/ProductImage'
import {upload} from 'App/Services/uploadService'

export default class ProductImagesController {
  public async index ({response}: HttpContextContract) {
    const images =  await ProductImage.all();
    if (!images){
      return response.status(404).json({message:'error on retrive'})
    }
    return response.ok({data:images,message:'imges retrived successfully'})
  }

  public async store ({request,response}: HttpContextContract) {
    const files = request.allFiles();
    let data = request.only(['productId','url'])
    let productsImages = [];
    for (let i in files) {
      let produtcImage
      data.url = await upload(files[i])
      produtcImage = await ProductImage.create(data);
      // @ts-ignore
      productsImages.push(produtcImage)
    }
    return response.ok({data:productsImages,message:'imges saved successfully'})

  }

  public async show ({params,response}: HttpContextContract) {
    const productImage = await ProductImage.find(params.id);
    if (!productImage){
      return response.status(404).json({ data: productImage, message: 'product not find' });
    }
    return response.ok({ data: productImage, message: 'product retrived successfully' })
  }

  public async update ({params,request,response}: HttpContextContract) {
    let data = request.only(['productId','url'])

    const productImage = await ProductImage.find(params.id);
    if (!productImage){
      return response.status(404).json({ data: productImage, message: 'product not find' });
    }
    const files = request.allFiles();
    if (files.img[0]){
      data.url = await upload(files.img[0])
    }
    productImage.merge(data)
    return response.ok({ data: productImage, message: 'productImage updated successfully' });

  }

  public async destroy ({params,response}: HttpContextContract) {
    const productImage = await ProductImage.find(params.id);
    if (!productImage){
      return response.status(404).json({ data: productImage, message: 'product not find' });
    }
    await productImage.softDelete();
    return response.ok({ data: productImage, message: 'product deleted successfully' });
  }
}
