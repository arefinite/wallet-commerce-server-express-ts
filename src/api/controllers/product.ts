import { Request, Response } from 'express'
import { Product } from '../models/product'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ success: true, products })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' + err })
  }
}


// export const createProducts = async (req: Request, res: Response) => { 
//     const { productName, price, description, imageUrl, stock } = req.body 
//     const product: IProduct = await Product.create({ productName, price, description, imageUrl,stock })
//     res.status(201).json({success:true, product})
// }