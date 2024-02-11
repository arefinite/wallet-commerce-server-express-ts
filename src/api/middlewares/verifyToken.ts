import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET_KEY as string, err => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: 'User not authenticated' })
      }
      next()
    })
  } else {
    return res
      .status(401)
      .json({ success: false, message: 'User not authenticated' })
  }
}
