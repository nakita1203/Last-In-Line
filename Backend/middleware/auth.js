import { verifyJwt } from "../utils/jwtUtils.js";
import { validateSession } from "../utils/sessionUtils.js";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const sessionId = req.cookies.sessionId;

    if (!token || !sessionId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = verifyJwt(token);
        const session = await validateSession(decoded.id, sessionId);

        if (!session) {
            return res.status(401).json({ success: false, message: "Session expired or invalid." });
        }
        req.body.userId = decoded.id;
        next();

    } catch (error) {
        console.error("Authorization error:", error.message);
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export {
    authMiddleware
};