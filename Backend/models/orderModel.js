import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type: String, unique: true, required: true},
    items: {type: Array, required: true},
    amount: {type: Number, required: true},
    status: {type: String, required: true},
    date: {type: Date, required: true},
    payment: {type: Boolean, required: true}
})

const orderModel = mongoose.model ("order", orderSchema);
export default orderModel;