import { db } from '../config/database.js';
import bcrypt from "bcrypt";
import passport from "passport";

const signup = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    try {
        const checkUsernameExist = await db.query("SELECT * FROM users WHERE username= $1", [username]);
        if (checkUsernameExist.rows.length > 0) {
            res.status(400).json({ message: "Username already exists. Try logging in." });
        }
        else {
            if (password == confirmPassword) {
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
            else
                res.status(500).json({ message: "Error confirming password" })
        }
    } catch (error) {
        res.status(500).json({ message: "Sever error" });
    }
}

//login function is used like a middleware
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { //get err, user, info from cb(err, user, info) 
        if (err) {
            next(err);  // next function in middleware
        }
        else {
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: info?.message || 'Invalid credentials', // if (info && info.message) = infor?.message  
                });
            }
            req.login(user, (err) => {
                if (err) next(err);
                else {
                    res.json({
                        success: true,
                        message: info?.message || 'Login successful',
                        user: req.user,
                    });
                }
            });
        }
    })(req, res, next);
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

