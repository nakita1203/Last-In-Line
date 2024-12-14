import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
        required: true,
        enum: ['Electronics', 'Clothing', 'Furniture', 'Toys', 'Books', 'Sports', 'Household Items', 'Tools', 'Accessories', 'Health & Beauty', 'Home Decor', 'Kitchen & Dining', 'Office Supplies', 'Automotive', 'Gadgets', 'Stationery', 'Other'],
    }
});

const itemModel = mongoose.model("item", itemSchema);

export default itemModel;