import express from "express";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectDB();

app.use("/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'));

app.get("/", (req, res) => {
    res.send("API Working")
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});