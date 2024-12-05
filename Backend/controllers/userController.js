import { generateSessionId, validateSession, deleteSession } from '../utils/sessionUtils.js';
import { createJwt, verifyJwt } from '../utils/jwtUtils.js';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 10;

// Login an existing user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, error: "Email and password are required." });
    }
    if (!validator.isEmail(email)) {
        return res.json({ success: false, error: "Please enter a valid email address." });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials." });
        }

        const existingSession = await validateSession(user._id, req.cookies.sessionId);
        if (existingSession) {
            return res.json({ success: false, message: "User already logged in elsewhere." });
        }

        const sessionId = await generateSessionId(user._id);
        const token = createJwt(user._id);

        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 30 * 60 * 1000,
        });
        console.log("Generated sessionId:", sessionId);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.json({ success: false, message: "Error during login." });
    }
};

const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.json({ success: false, error: "Name, username, email, and password are required." });
    }
    if (!validator.isEmail(email)) {
        return res.json({ success: false, error: "Please enter a valid email address." });
    }
    if (password.length < 8) {
        return res.json({ success: false, error: "Password must be at least 8 characters." });
    }

    try {
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, error: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new userModel({ name, username, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createJwt(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during registration:", error);
        res.json({ success: false, message: "Error during registration." });
    }
};

const logoutUser = async (req, res) => {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        return res.status(401).json({ success: false, message: "No session found." });
    }

    try {
        const session = await validateSession(null, sessionId);
        if (!session) {
            return res.status(401).json({ success: false, message: "Invalid session." });
        }

        await deleteSession(session.userId);
        res.clearCookie('sessionId');
        res.json({ success: true, message: "Logged out successfully." });
    } catch (error) {
        console.error("Error during logout:", error.message);
        res.status(500).json({ success: false, message: "Error during logout." });
    }
};

const validateUserSession = async (req, res) => {
    const sessionId = req.cookies.sessionId;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token || !sessionId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = verifyJwt(token);
        const session = await validateSession(decoded.id, sessionId);
        if (!session) {
            return res.status(401).json({ success: false, message: "Invalid Session ID." });
        }
        res.json({success: true, message: "Valid Session."});
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(401).json({success: false, message: "Not Authorized"})
    }
}

export {
    loginUser,
    registerUser,
    logoutUser,
    validateUserSession
};