import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://test:yhkRBlIRvwecL123@test.hwz0iah.mongodb.net/').then(()=>console.log("DB Connected"))
}
