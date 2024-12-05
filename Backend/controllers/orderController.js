import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import item from "express/lib/view.js";

const stripe = new Stripe(process.env.STRIPE_KEY);

const placeOrder = async(req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "IDR",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100*80
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "IDR",
                product_data: {
                    name: "Service Charge"
                },
                unit_amount: 2*100*80
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
        });

        res.json({success:true,session_url:session.url});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export {placeOrder};