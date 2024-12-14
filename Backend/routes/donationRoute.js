import express from 'express';
import multer from 'multer';
import {donationList, donationAdd, donationDelete} from '../controllers/donationController.js';
import {authMiddleware} from "../middleware/auth.js";

const donationRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

donationRouter.get('/list-donations', donationList);
donationRouter.post('/api/add-donation', authMiddleware, upload.single('image'), donationAdd);
donationRouter.delete('/api/delete-donation', authMiddleware, donationDelete);

export default donationRouter;