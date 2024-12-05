import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import express from 'express';
import Stripe from 'stripe';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import { placeOrder } from '../controllers/orderController.js';

// Initialize express app for testing
const app = express();
app.use(express.json());
app.post('/order/place', placeOrder);

// Mock Stripe object
const stripeMock = sinon.createStubInstance(Stripe);
stripeMock.checkout = { sessions: { create: sinon.stub() } };

describe('POST /order/place - placeOrder()', () => {
    it('should place an order successfully and return a session URL', async () => {
        const mockOrder = {
            userId: 'mockUserId',
            items: [{ name: 'Pizza', price: 10000, quantity: 2 }],
            amount: 20000,
        };

        const res = await request(app)
            .post('/order/place')
            .send(mockOrder);

        expect(res.status).to.equal(200);
        expect(res.body.success).to.be.true;
        expect(res.body.session_url).to.match(/^http:\/\/mock-stripe-session-url/);
    });

    it('should handle errors gracefully', async () => {
        orderModel.prototype.save.rejects(new Error('Database Error'));

        const mockOrder = {
            userId: 'mockUserId',
            items: [{ name: 'Pizza', price: 10000, quantity: 2 }],
            amount: 20000,
        };

        const res = await request(app)
            .post('/order/place')
            .send(mockOrder);

        expect(res.status).to.equal(500);
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.equal('Error');
    });
});