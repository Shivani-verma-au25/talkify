import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express() 

// miidlewares import for this app
app.use(express.json({limit : '16kb'}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(cookieParser())
app.use(cors())


// routes imports
import authRouter from './routers/auth.routes.js'
import userRouter from './routers/user.routes.js'
app.use('/api/auth' ,authRouter)
app.use('/api/user' ,userRouter)

export {app}