import express from 'express'
import connectDB from './db/db.js'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import cors from 'cors'

dotenv.config()

export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret
})
 
const app = express()
const PORT = process.env.PORT        
 
//using middlewares
app.use(express.json()) 
app.use('/uploads', express.static("uploads"))
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Hello World')
})

//routes
import userRoutes from './routes/user.js'
import courseRoutes from './routes/course.js'
import adminRoutes from './routes/admin.js'

app.use('/api',userRoutes)
app.use('/api',courseRoutes)
app.use('/api',userRoutes)
 
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
    connectDB()
})