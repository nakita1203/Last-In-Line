import foodModel from '../models/foodModel.js';
import fs from 'fs';
import * as console from 'node:console';
import mongoose from 'mongoose';

const foodList = async (req, res) => {
    try {
        const food = await foodModel.find();
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        res.json({ success: true, data: food });
    } catch (error) {
        console.error("Error fetching food detail:", error);
        res.status(500).json({ success: false, message: "Error fetching food detail" });
    }
};

const foodAdd = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }

    let imageFilename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        prodDate: req.body.prodDate,
        price: req.body.price,
        category: req.body.category,
        image: imageFilename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Successfully added", food_id: food._id });
        console.log("Food Added Successfully: ", food);
    } catch (error) {
        console.error("Error adding food:", error);
        res.json({ success: false, message: "Error adding food" });
    }
};

const foodDelete = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.food_id)) {
            return res.status(400).json({ success: false, message: "Invalid food_id" });
        }

        const food = await foodModel.findByIdAndDelete(req.body.food_id);

        if (!food) {
            console.error("Food not found for deletion:", food_id);
            return res.status(404).json({ success: false, message: "Food entry not found" });
        }

        const imagePath = `uploads/${food.image}`;
        console.log("Attempting to delete image file:", imagePath);

        if (food.image && fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image file:", err);
                } else {
                    console.log("Image file deleted successfully:", imagePath);
                }
            });
        }

        res.json({ success: true, message: "Food Successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export {
    foodList,
    foodAdd,
    foodDelete
};