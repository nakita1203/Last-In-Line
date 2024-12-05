import Redis from 'ioredis';
import crypto from 'crypto';

const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

redis.on('connect', () => console.log("Connected to Redis"));
redis.on('error', (err) => console.error("Redis connection error:", err));

export const generateSessionId = async (userId) => {
    const sessionId = crypto.randomBytes(32).toString('hex');
    const sessionData = {
        sessionId,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * 60 * 1000,
    };

    await redis.set(userId, JSON.stringify(sessionData), 'EX', 30 * 60);
    return sessionId;
};

export const validateSession = async (userId, sessionId) => {

    console.log("Validating session for userId:", userId, "with sessionId:", sessionId);
    const session = await redis.get(userId);
    if (!session) {
        console.log("No session found in Redis.");
        return null;
    }
    const sessionData = JSON.parse(session);
    if (sessionData.sessionId !== sessionId || sessionData.expiresAt < Date.now()) {
        console.log("Session expired or invalid.");
        await redis.del(userId);
        return null;
    }
    console.log("Session validated successfully.");
    return sessionData;
};

export const deleteSession = async (userId) => {
    await redis.del(userId);
};