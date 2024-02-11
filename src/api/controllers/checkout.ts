import { Request, Response } from 'express'
import { IUser, User } from '../models/user'
import { IProduct, Product } from '../models/product'

export const checkout = async (req: Request, res: Response) => {
  const { userId, cartItems } = req.body
  try {
    const user: IUser | null = await User.findById(userId)
    const productIds = Object.keys(cartItems)

    const products = await Product.find({ _id: { $in: productIds } })
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' })
    }

    if (products.length !== productIds.length) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' })
    }

    let totalAmount = 0
    for (const productId of productIds) {
      const product: IProduct | undefined = products.find(
        p => String(p._id) === productId
      )
      if (!product) {
        return res
          .status(400)
          .json({ success: false, message: 'Product not found' })
      }
      if (product.stock < cartItems[productId]) {
        return res
          .status(400)
          .json({ success: false, message: 'Insufficient stock' })
      }

      totalAmount += product.price * cartItems[productId]
    }

    if (user.balance < totalAmount) {
      return res
        .status(400)
        .json({ success: false, message: 'Insufficient balance' })
    }

    const userModel = user as IUser & { save: () => Promise<IUser> }

    userModel.balance -= totalAmount
    userModel.purchasedItems.push(...productIds)

    await userModel.save()
    await Product.updateMany(
      { _id: { $in: productIds } },
      { $inc: { stock:  -1} }
    )

    res.status(200).json({ success: true, message: 'Purchase successful' })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
    })
  }
}
