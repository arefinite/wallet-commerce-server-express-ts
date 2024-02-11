import { verifyToken } from './../middlewares/verifyToken';
import { Router } from "express";
import { checkout } from "../controllers/checkout";

export const checkoutRouter = Router()

checkoutRouter.post('/',verifyToken,checkout)