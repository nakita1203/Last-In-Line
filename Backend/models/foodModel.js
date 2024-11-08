import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prodDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    }
});

const foodModel = mongoose.model("food", foodSchema);

export default foodModel;