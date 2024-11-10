import express from "express";
import {foodList, foodAdd, foodDelete} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

foodRouter.get("/list", foodList);
foodRouter.post("/add", upload.single('image'), foodAdd);
foodRouter.delete("/delete", foodDelete);

export default foodRouter;