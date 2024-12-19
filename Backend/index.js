import express from "express";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import adminRouter from "./routes/adminRoute.js";
import orderRouter from "./routes/orderRoute.js";
import donationRouter from "./routes/donationRoute.js";
import itemRouter from "./routes/itemRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 4000;
const corsOptions = {
    origin: ["http://localhost:5173", "http://192.168.56.1:5173"],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

connectDB();

app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.use("/donations", donationRouter);
app.use("/items", itemRouter);
app.use("/images",express.static('uploads'));

app.get("/", (req, res) => {
    res.send("API Working")
});

app.listen(port, 'localhost', () => {
    console.log(`Server running on http://localhost:${port}`);
});