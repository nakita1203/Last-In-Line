import express from 'express';
import { loginUser, registerUser, logoutUser, validateUserSession } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.post("/api/logout", authMiddleware, logoutUser);

userRouter.get("/validate-session", validateUserSession);

export default userRouter;