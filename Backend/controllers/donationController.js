import donationModel from '../models/donationModel.js';
import fs from 'fs';
import mongoose from 'mongoose';

const donationList = async (req, res) => {
    try {
        const donations = await donationModel.find({});
        res.json({
            success: true,
            data: donations
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error retrieving donations" });
    }
};

const donationAdd = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const imageFilename = `${req.file.filename}`;

    const donation = new donationModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        image: imageFilename,
        donator: req.body.donator,
        status: req.body.status || 'Available'
    });

    try {
        await donation.save();
        res.json({
            success: true,
            message: "Donation successfully added",
            donation_id: donation._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding donation" });
    }
};

const donationDelete = async (req, res) => {
    try {
        const { donation_id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(donation_id)) {
            return res.status(400).json({ success: false, message: "Invalid donation_id" });
        }

        const donation = await donationModel.findByIdAndDelete(donation_id);

        if (!donation) {
            return res.status(404).json({ success: false, message: "Donation entry not found" });
        }

        fs.unlink(`uploads/${donation.image}`, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        res.json({ success: true, message: "Donation successfully deleted" });
    } catch (error) {
        console.error('Error deleting donation:', error);
        res.status(500).json({ success: false, message: "Error deleting donation" });
    }
};

export {
    donationList,
    donationAdd,
    donationDelete
};
