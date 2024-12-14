import itemModel from '../models/itemModel.js';
import fs from 'fs';
import mongoose from 'mongoose';
import { verifyJwt } from '../utils/jwtUtils.js';
import { validateSession } from '../utils/sessionUtils.js';

const itemList = async (req, res) => {
    try {
        const items = await itemModel.find({});
        res.json({
            success: true,
            data: items
        });
    } catch (error) {
        console.error("Error fetching item list:", error);
        res.status(500).json({ success: false, message: "Error retrieving items" });
    }
};

const itemAdd = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const sessionId = req.cookies.sessionId;

    if (!token || !sessionId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = verifyJwt(token);
        const session = await validateSession(decoded.id, sessionId);

        if (!session) {
            return res.status(401).json({ success: false, message: "Invalid session" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const imageFilename = `${req.file.filename}`;

        const item = new itemModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: imageFilename,
            category: req.body.category
        });

        await item.save();

        res.json({
            success: true,
            message: "Item successfully added",
            item_id: item._id
        });
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ success: false, message: "Error adding item" });
    }
};

const itemDelete = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const sessionId = req.cookies.sessionId;

    if (!token || !sessionId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = verifyJwt(token);
        const session = await validateSession(decoded.id, sessionId);

        if (!session) {
            return res.status(401).json({ success: false, message: "Invalid session" });
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid item ID" });
        }

        const item = await itemModel.findByIdAndDelete(id);

        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        fs.unlink(`uploads/${item.image}`, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        res.json({ success: true, message: "Item successfully deleted" });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ success: false, message: "Error deleting item" });
    }
};

export {
    itemList,
    itemAdd,
    itemDelete
};