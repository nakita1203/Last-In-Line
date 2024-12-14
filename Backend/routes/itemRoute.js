import express from 'express';
import multer from 'multer';
import { itemList, itemAdd, itemDelete } from '../controllers/itemController.js';
import {authMiddleware} from "../middleware/auth.js";

const itemRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

itemRouter.get('/list-items', itemList);
itemRouter.post('/api/add-item', authMiddleware, upload.single('image'), itemAdd);
itemRouter.delete('/api/delete-item', authMiddleware, itemDelete);

export default itemRouter;