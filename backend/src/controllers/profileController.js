import { db } from '../config/database.js';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";

const getProfile = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [req.user.id]);
        const profile = result.rows[0];
        if (profile.avatar) {
            // convert avatar image to url
            const __dirname = dirname(fileURLToPath(import.meta.url));
            const __srcURL = dirname(__dirname);
            profile.avatar = path.join(__srcURL + "/public/uploads", profile.avatar);
        }
        res.json(profile);
    } catch (error) {
        console.log(`Error getting profile: ${error}`);
        res.status(500).json({ message: "Server error" });
    }
}

const postProfile = async (req, res) => {
    const name = req.body.name || null;
    const phone = req.body.phone || null;
    const address = req.body.address || null;
    const dob = req.body.dob || null;
    const sex = req.body.sex || null;
    const avatar = req.file?.originalname || null;

    try {
        await db.query(
            "UPDATE users SET name=$1, phone=$2, address=$3, dob=$4, sex=$5, avatar=$6 WHERE id=$7"
            , [name, phone, address, dob, sex, avatar, req.user.id]
        );
        res.json({ message: "Updated profile successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Sever error" });
    }

}

export { getProfile, postProfile }