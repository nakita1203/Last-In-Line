import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import express from 'express';
import foodRouter from '../routes/foodRoute.js'; // Import the router
import foodModel from '../models/foodModel.js';

// Initialize an Express app for testing with the food router
const app = express();
app.use(express.json());
app.use('/food', foodRouter); // Use the foodRouter for '/food' routes

describe('Food Controller Tests', () => {
    let foodStub;

    before(() => {
        // Stub Mongoose connection
        sinon.stub(mongoose, 'connect').resolves();
    });

    after(() => {
        mongoose.connect.restore();
    });

    beforeEach(() => {
        foodStub = sinon.stub(foodModel, 'find');
    });

    afterEach(() => {
        foodStub.restore();
    });

    describe('GET /food/list - foodList()', () => {
        it('should return all food items', async () => {
            const mockFoods = [
                { name: 'Pizza', description: 'Cheese Pizza', prodDate: '2024-12-01', price: 10, image: 'pizza.jpg', category: 'Fast Food' }
            ];
            foodStub.resolves(mockFoods);

            const res = await request(app).get('/food/list');

            if (res.status !== 200) throw new Error(`Expected 200 status, got ${res.status}`);
            if (!res.body.success) throw new Error('Expected success to be true');
            if (!Array.isArray(res.body.data)) throw new Error('Expected data to be an array');
            if (res.body.data[0].name !== 'Pizza') throw new Error('Expected first item to be Pizza');
        });

        it('should handle errors gracefully', async () => {
            foodStub.rejects(new Error('Database Error'));

            const res = await request(app).get('/food/list');

            if (res.body.success !== false) throw new Error('Expected success to be false');
            if (res.body.message !== 'Error') throw new Error('Expected error message to be "Error"');
        });
    });

    describe('POST /food/add - foodAdd()', () => {
        it('should add a new food item successfully', async () => {
            const mockFood = {
                name: 'Burger',
                description: 'Delicious Burger',
                prodDate: '2024-12-01',
                price: 5,
                image: 'burger.jpg',
                category: 'Fast Food',
            };

            // Stub save() method on the prototype of the foodModel
            sinon.stub(foodModel.prototype, 'save').resolves(mockFood);

            const res = await request(app)
                .post('/food/add')
                .field('name', 'Burger')
                .field('description', 'Delicious Burger')
                .field('prodDate', '2024-12-01')
                .field('price', 5)
                .field('category', 'Fast Food')
                .attach('image', Buffer.from('fake image content'), 'burger.jpg'); // Mock image upload

            if (res.status !== 200) throw new Error(`Expected 200 status, got ${res.status}`);
            if (!res.body.success) throw new Error('Expected success to be true');
            if (res.body.message !== 'Successfully added') throw new Error('Expected success message');

            foodModel.prototype.save.restore();
        });

        it('should return error if image file is missing', async () => {
            const res = await request(app).post('/food/add').send({
                name: 'Burger',
                description: 'Delicious Burger',
                prodDate: '2024-12-01',
                price: 5,
                category: 'Fast Food'
            });

            if (res.status !== 400) throw new Error(`Expected 400 status, got ${res.status}`);
            if (res.body.success !== false) throw new Error('Expected success to be false');
            if (res.body.message !== 'Image file is required') throw new Error('Expected image file error message');
        });
    });
});
