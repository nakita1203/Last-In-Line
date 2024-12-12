import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        if (error.message.code === 'ETIMEDOUT') {
            console.error('Error: MongoDB connection timed out. Please check your internet connection or database server.');
        } else if (error.message.code === 'ECONNREFUSED') {
            console.error('Error: Connection refused. Ensure your database server is running.');
        } else if (error.message.includes('EADDRINUSE')) {
            console.error('Error: Port is already in use. Try using a different port.');
        } else {
            console.error('Error connecting to the database:', error.message);
        }
        process.exit(1);
    }
}