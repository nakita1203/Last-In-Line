import mongoose from 'mongoose';

const donationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    donator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Donated', 'Waiting List', 'Available'],
        default: 'Available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const donationModel = mongoose.model("donation", donationSchema);

export default donationModel;