import mongoose from "mongoose";
import mogoose from "mongoose";



export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected : ${conn.connection.host}`);
        
    } catch (error) {
        console.error("DB Connection Failed" , error);
        
    }
}