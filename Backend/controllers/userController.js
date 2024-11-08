import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required." });
    }

    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email address." });
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

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.json({ success: false, message: "All fields (name, username, email, password) are required." });
    }

    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email address." });
    }

    try {
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "User already exists." });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (at least 8 characters)." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, username, email, password: hashedPassword });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export {
    loginUser,
    registerUser
};