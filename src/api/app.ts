import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { UserRouter } from './routes/user'



export const app = express()

//middlewares
if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())
app.use('/api/v1/user',UserRouter)
