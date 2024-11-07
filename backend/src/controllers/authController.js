import { db } from '../config/database.js';
import bcrypt from "bcrypt";
import passport from "passport";

const signup = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const checkUsernameExist = await db.query("SELECT * FROM users WHERE username= $1", [username]);
        if (checkUsernameExist.rows.length > 0) {
            res.status(400).json({ message: "Username already exists. Try logging in." });
        }
        else {
            //Use saltRounds: 10;
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    res.status(500).json({ message: "Error hashing password" });
                } else {
                    const result = await db.query(
                        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
                        [username, hash]
                    );
                    const user = result.rows[0];
                    req.login(user, (err) => {
                        if (err)
                            res.status(500).json({ message: "Login error" });
                        else
                            res.json({ message: "Registration successful", user: user });
                    })
                }
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Sever error" });
    }
}

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);  // Xử lý lỗi nếu có
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: info?.message || 'Invalid credentials', // Trả về thông báo lỗi từ info
            });
        }
        req.login(user, (err) => {
            if (err) return next(err);
            return res.json({
                success: true,
                message: 'Login successful',
                user: req.user,  // Trả về thông tin người dùng
            });
        });
    })(req, res, next);  // Thực thi passport.authenticate
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err)
            res.status(500).json({ message: "Logout error" });
        else
            res.json({ message: "Logout successful" });
    })
}

export { signup, login, logout };

