const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Đăng ký người dùng
router.post("/register", async (req, res) => {
    try {
        const { userName, password, fullName, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ userName, password: hashedPassword, fullName, email });
        await newUser.save();
        
        res.json({ message: "Đăng ký thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
});

// Đăng nhập và tạo Access Token + Refresh Token
router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (!user) return res.status(401).json({ message: "Sai tên đăng nhập!" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Sai mật khẩu!" });

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

        user.refreshToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
});

// API để lấy Access Token mới bằng Refresh Token
router.post("/refresh", async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(403).json({ message: "Không có Refresh Token!" });

        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(403).json({ message: "Refresh Token không hợp lệ!" });

        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Refresh Token hết hạn!" });

            const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
});
