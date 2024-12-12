import adminModel from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;
const saltRounds = 10;

const adminRegister = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Name, email, and password are required." });
    }

    try {
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAdmin = new adminModel({
            name,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();

        const token = jwt.sign({ id: newAdmin._id, role: "admin" }, secretKey, { expiresIn: "2h" });

        res.status(201).json({
            success: true,
            message: "Admin registered successfully.",
            token,
        });
    } catch (error) {
        console.error("Error during admin registration:", error);
        res.status(500).json({ success: false, message: "Error during registration." });
    }
};

const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id, role: "admin" }, secretKey, { expiresIn: "2h" });

        res.json({ success: true, message: "Logged in successfully", token });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ success: false, message: "Error during login" });
    }
};

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        if (decoded.role !== "admin") {
            return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
        }

        req.adminId = decoded.id;
        next();
    } catch (error) {
        console.error("Authorization error:", error);
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export {
    adminRegister,
    adminLogin,
    verifyAdmin
};
