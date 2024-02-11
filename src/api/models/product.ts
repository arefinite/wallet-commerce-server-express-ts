import { Schema, model } from 'mongoose'
export interface IProduct {
    _id?: string,
    productName: string
    price: number
    description: string 
    imageUrl: string 
    stock:number
}

const productSchema = new Schema<IProduct>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true, min: [0, 'stock can not be lower than 0'] },
    imageUrl:{ type: String, required: true}
},
    {
    timestamps:true
})

export const Product = model<IProduct>('Product', productSchema)