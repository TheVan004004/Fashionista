import bcrypt from "bcrypt";
import { db } from '../config/database.js';
import passport from "passport";
import { Strategy } from "passport-local";

passport.use(new Strategy(async function verify(username, password, cb) {
    /* 
        verify(username,password,cb): Passport automatically get username, password from req.body
        cb is callback, cb(err,user,infor): if user not found, 'user' is replaced by 'false', infor: {message: "..."}
    */
    try {
        const result = await db.query("SELECT * FROM users WHERE username= $1", [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            bcrypt.compare(password, storedHashedPassword, (err, result) => {
                if (err)
                    return cb(err);
                else {
                    if (result)
                        return cb(null, user, { message: 'Login successful' });
                    else
                        return cb(null, false, { message: 'Incorrect password' });
                }
            })
        }
        else
            return cb(null, false, { message: 'User not found' });
    } catch (error) {
        cb(error);
    }
}));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
    try {
        const result = await db.query("SELECT id FROM users WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            cb(null, result.rows[0]);
        } else {
            cb(new Error("User not found"));
        }
    } catch (error) {
        cb(error);
    }
});

export { passport }