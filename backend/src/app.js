import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express() 

// miidlewares import for this app
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true // allow frontend to sent the cookies
}))

app.use(express.json({limit : '16kb'}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(cookieParser())



// routes imports
import authRouter from './routers/auth.routes.js'
import userRouter from './routers/user.routes.js'
import chatRouter from './routers/chat.routes.js'
// import callRouter from './routers/call.routes.js'

app.use('/api/auth' ,authRouter)
app.use('/api/user' ,userRouter)
app.use('/api/chat' ,chatRouter)
// app.use('/api/call' ,callRouter)

export {app}