import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://arifatalya:5hgJjI6nS7qRzPL0@server.fybnr.mongodb.net/?retryWrites=true&w=majority&appName=Server').then(()=>console.log("DB Connected"))
}
