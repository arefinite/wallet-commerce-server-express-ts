import { Router } from 'express'
import { getAllProducts } from '../controllers/product'
import { verifyToken } from '../middlewares/verifyToken'

export const productRouter = Router()

productRouter.get('/', verifyToken ,getAllProducts)
