import mongoose from 'mongoose'

const connectDB = async ()=>{
    try {
        const url = process.env.DB_URL || "mongodb://127.0.0.1:27017"
        await mongoose.connect(url)
        console.log("Database connected successfully.")
    } catch (error) {
        console.log(error)
    }
}


export default connectDB 