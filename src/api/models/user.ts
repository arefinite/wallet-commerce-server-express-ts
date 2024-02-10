import { Schema, model } from 'mongoose'

export interface IUser {
  _id?: string
  email: string
  fullName: string
  password: string
  balance: number
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 10000 },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser>('User', userSchema)
