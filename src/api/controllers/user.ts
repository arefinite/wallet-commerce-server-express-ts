import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser, User } from '../models/user'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, fullName, password } = req.body

    const user = await User.findOne({ email })
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: 'User already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const createUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
    })
    if (!createUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User registration failed' })
    }
    res
      .status(201)
      .json({ success: true, message: 'User registration successful' })
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong ' + err })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user: IUser | null = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' })
    }

    const matchedPassword = await bcrypt.compare(password, user.password)
    if (!matchedPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid Credentials' })
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY as string)
    res.status(200).json({ success: true, token, userId: user._id })
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong ' + err })
  }
}
