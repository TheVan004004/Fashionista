import bcrypt from "bcrypt";
import { db } from '../config/database.js';
import passport from "passport";
import { Strategy } from "passport-local";

passport.use(new Strategy(async function verify(username, password, cb) {
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
                        return cb(null, user);
                    else
                        return cb(null, false, { message: 'Invalid credentials' });
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
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});

export { passport }