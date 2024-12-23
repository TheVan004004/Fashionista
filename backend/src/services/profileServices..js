import { db } from "../config/database.js";
import resData from "../helpers/jsonFormat.js";

const getProfile = async (userId) => {
    let { rows } = await db.query(
        `SELECT * FROM users WHERE id = $1`,
        [userId]
    );
    const dob = rows[0].dob;
    const dobVN = new Date(dob).toLocaleDateString('vi-VN', { timeZone: "Asia/Bangkok" });
    rows[0] = { ...rows[0], dob: dobVN };
    const result = resData('Get profile successfully', 0, rows);
    return result;
}

const postProfile = async (profileData, userId) => {
    let profileCurr = await getProfile(userId);
    if (profileData.fullName) profileCurr = { ...profileCurr, fullName: profileData.fullName };
    if (profileData.phone) profileCurr = { ...profileCurr, phone: profileData.phone };
    if (profileData.address) profileCurr = { ...profileCurr, address: profileData.address };
    if (profileData.dob) profileCurr = { ...profileCurr, dob: profileData.dob };
    if (profileData.sex) profileCurr = { ...profileCurr, sex: profileData.sex };

    const { rows } = await db.query(
        `UPDATE users
             SET fullname =$1, phone = $2, address = $3, dob = $4, sex = $5
             WHERE id = $6
             RETURNING *;`,
        [
            profileCurr.fullName,
            profileCurr.phone,
            profileCurr.address,
            profileCurr.dob,
            profileCurr.sex,
            userId
        ]
    )
    const result = resData('Update profile successfully', 0, rows);
    return result;
}


const profileServices = { getProfile, postProfile };
export default profileServices;