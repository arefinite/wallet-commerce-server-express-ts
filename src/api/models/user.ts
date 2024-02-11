import { Schema, model } from 'mongoose'

export interface IUser {
  _id?: string
  email: string
  fullName: string
  password: string
  balance: number
  purchasedItems: string[]
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 10000 },
    purchasedItems: [
      { type: Schema.Types.ObjectId, ref: 'product', default: [] },
    ],
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser>('User', userSchema)
