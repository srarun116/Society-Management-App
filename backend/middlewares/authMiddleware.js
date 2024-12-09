

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to check token
exports.protect = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};


