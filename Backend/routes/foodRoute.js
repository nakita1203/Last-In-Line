import express from "express";
import {foodList} from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.get("/list", foodList);

export default foodRouter;