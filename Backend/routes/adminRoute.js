import express from "express";
import multer from "multer";
import { foodList, foodAdd, foodDelete } from "../controllers/foodController.js";
import { adminRegister, adminLogin, verifyAdmin } from "../controllers/adminController.js";

const adminRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);

adminRouter.get("/list", foodList);
adminRouter.post("/api/add-food", verifyAdmin, upload.single("image"), foodAdd);
adminRouter.delete("/api/delete-food", verifyAdmin, foodDelete);

export default adminRouter;