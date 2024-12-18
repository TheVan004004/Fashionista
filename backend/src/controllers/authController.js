import { db } from '../config/database.js';
import bcrypt from "bcrypt";
import { passport } from '../config/passportConfig.js';
import resData from '../helpers/jsonFormat.js';

const apiSignup = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const checkUsernameExist = await db.query("SELECT * FROM users WHERE username= $1", [username]);
        if (checkUsernameExist.rows.length > 0) {
            const result = resData('Username already exists. Try logging in.', 1, '');
            res.status(400).json(result);
        }
        else {
            //Use saltRounds: 10;
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    console.error(">>> Error hashing password:", err);
                    const result = resData('Error hashing password', 1, '');
                    res.status(500).json(result);
                } else {
                    const result = await db.query(
                        "INSERT INTO users (username, password,role) VALUES ($1, $2,$3) RETURNING *",
                        [username, hash, 'user']
                    );
                    const user = result.rows[0];
                    const userId = result.rows[0].id;
                    await db.query(
                        `INSERT INTO cart (user_id) VALUES ($1)`,
                        [userId]
                    );
                    req.login(user, (err) => {
                        if (err) {
                            const result = resData('Login error', 1, '');
                            res.status(500).json(result);
                        }
                        else {
                            const result = resData('Registration successful', 0, user);
                            res.json(result);
                        }
                    })
                }
            })
        }
    } catch (error) {
        const result = resData('Sever error', 1, '');
        res.status(500).json(result);
    }
}

//login function use a passport.authenticate middleware (because we need control err and info)
const apiLogin = (req, res) => {
    passport.authenticate('local', (err, user, info) => { //get err, user, info from cb(err, user, info) 
        if (err) {
            const result = resData('Error during authentication', 1, '');
            res.status(500).json(result);
        }
        else {
            if (!user) {
                let message = info?.message || 'Invalid credentials';
                const result = resData(message, 1, '');
                return res.status(400).json({ ...result, success: false });
            }
            req.login(user, (err) => {
                if (err) {
                    const result = resData('Sever error', 1, '');
                    res.status(500).json(result);
                }
                else {
                    let message = info?.message || 'Login successful';
                    const result = resData(message, 0, req.user);
                    res.json({ ...result, success: true });
                }
            });
        }
    })(req, res);
};

const apiLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            const result = resData('Logout error', 1, '');
            res.status(500).json(result);
        }
        else {
            const result = resData('Logout successfully', 0, '');
            res.json(result);
        }
    })
}

const authController = { apiSignup, apiLogin, apiLogout };
export default authController;