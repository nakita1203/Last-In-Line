import foodModel from '../models/foodModel.js';
import fs from 'fs';
import * as console from 'node:console';
import mongoose from 'mongoose';

// List all foods
const foodList = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Add a new food
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
        const savedFood = await food.save();
        res.json({ success: true, message: "Successfully added", food_id: savedFood._id });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Delete a food entry
const foodDelete = async (req, res) => {
    try {
        // Verifying if the provided food_id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.body.food_id)) {
            return res.status(400).json({ success: false, message: "Invalid food_id" });
        }

        const food = await foodModel.findByIdAndDelete(req.body.food_id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food entry not found" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.error(err);
        });

        res.json({ success: true, message: "Successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

export {
    foodList,
    foodAdd,
    foodDelete
};