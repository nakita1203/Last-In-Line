import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import redis from 'redis-mock'; // Use redis-mock for Redis simulation
import { loginUser, registerUser, logoutUser, validateUserSession } from '../controllers/userController.js';
import userModel from '../models/userModel.js';
import * as sessionUtils from '../utils/sessionUtils.js';
import * as jwtUtils from '../utils/jwtUtils.js';

// Mock Express App
const app = express();
app.use(express.json());

// Add routes directly
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/api/logout', logoutUser);
app.get('/validate-session', validateUserSession);

describe('User Controller Tests', () => {
    let redisClient;

    before(() => {
        // Simulate MongoDB connection
        sinon.stub(mongoose, 'connect').resolves();

        // Simulate Redis connection
        redisClient = redis.createClient({ host: '127.0.0.1', port: 6379, retry_strategy: () => 1000 });
        sinon.stub(sessionUtils, 'generateSessionId').callsFake(async (userId) => {
            const sessionId = `mockSessionId_${userId}`;
            await redisClient.set(sessionId, JSON.stringify({ userId }));
            return sessionId;
        });
        sinon.stub(sessionUtils, 'validateSession').callsFake(async (userId, sessionId) => {
            const sessionData = await redisClient.get(sessionId);
            if (!sessionData) return null;
            const parsed = JSON.parse(sessionData);
            return parsed.userId === userId ? parsed : null;
        });
        sinon.stub(sessionUtils, 'deleteSession').callsFake(async (userId) => {
            const keys = await redisClient.keys(`mockSessionId_${userId}`);
            keys.forEach((key) => redisClient.del(key));
        });
        sinon.stub(jwtUtils, 'createJwt').callsFake((userId) => `mockToken_${userId}`);
        sinon.stub(jwtUtils, 'verifyJwt').callsFake((token) => {
            const userId = token.split('_')[1];
            return { id: userId };
        });
    });

    after(() => {
        mongoose.connect.restore();
        redisClient.quit();
        sinon.restore();
    });

    beforeEach(() => {
        sinon.stub(userModel, 'findOne');
        sinon.stub(userModel.prototype, 'save');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should register a user successfully', async () => {
        userModel.findOne.resolves(null); // Simulate user not existing
        userModel.prototype.save.resolves(); // Simulate successful save

        const res = await request(app).post('/register').send({
            name: 'John Doe',
            username: 'johndoe',
            email: 'johndoe@example.com',
            password: 'password123',
        });

        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
        if (!res.body.success) throw new Error(`Expected success to be true, got ${res.body.success}`);
    });

    it('should fail to register an existing user', async () => {
        userModel.findOne.resolves({ email: 'johndoe@example.com' }); // Simulate user exists

        const res = await request(app).post('/register').send({
            name: 'John Doe',
            username: 'johndoe',
            email: 'johndoe@example.com',
            password: 'password123',
        });

        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
        if (res.body.success !== false) throw new Error(`Expected success to be false, got ${res.body.success}`);
        if (res.body.error !== 'User already exists.') throw new Error('Expected error message for existing user.');
    });

    it('should log in a user successfully', async () => {
        userModel.findOne.resolves({
            _id: 'mockUserId',
            email: 'johndoe@example.com',
            password: await bcrypt.hash('password123', 10),
        });

        const res = await request(app).post('/login').send({
            email: 'johndoe@example.com',
            password: 'password123',
        });

        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
        if (!res.body.success) throw new Error(`Expected success to be true, got ${res.body.success}`);
    });

    it('should fail to log in with incorrect credentials', async () => {
        userModel.findOne.resolves({
            _id: 'mockUserId',
            email: 'johndoe@example.com',
            password: await bcrypt.hash('password123', 10),
        });

        const res = await request(app).post('/login').send({
            email: 'johndoe@example.com',
            password: 'wrongpassword',
        });

        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
        if (res.body.success !== false) throw new Error(`Expected success to be false, got ${res.body.success}`);
        if (res.body.message !== 'Invalid credentials.') throw new Error('Expected error message for invalid credentials.');
    });

    it('should logout a user successfully', async () => {
        await redisClient.set('mockSessionId_mockUserId', JSON.stringify({ userId: 'mockUserId' }));

        const res = await request(app)
            .post('/api/logout')
            .set('Cookie', ['sessionId=mockSessionId_mockUserId']);

        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
        if (!res.body.success) throw new Error(`Expected success to be true, got ${res.body.success}`);
        if (res.body.message !== 'Logged out successfully.') throw new Error('Expected success message for logout.');
    });

    it('should validate a user session successfully', async () => {
        await redisClient.set('mockSessionId_mockUserId', JSON.stringify({ userId: 'mockUserId' }));

        const res = await request(app)
            .get('/validate-session')
            .set('Cookie', ['sessionId=mockSessionId_mockUserId'])
            .set('Authorization', 'Bearer mockToken_mockUserId');

        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
        if (!res.body.success) throw new Error(`Expected success to be true, got ${res.body.success}`);
    });

    it('should fail to validate an invalid session', async () => {
        const res = await request(app)
            .get('/validate-session')
            .set('Cookie', ['sessionId=invalidSessionId'])
            .set('Authorization', 'Bearer mockToken_mockUserId');

        if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
        if (res.body.success !== false) throw new Error(`Expected success to be false, got ${res.body.success}`);
        if (res.body.message !== 'Invalid Session ID.') throw new Error('Expected error message for invalid session.');
    });
});