import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/user'

export const UserRouter = Router()

UserRouter.post('/register', registerUser)
UserRouter.post('/login', loginUser)
