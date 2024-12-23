import resData from '../helpers/jsonFormat.js';
import profileServices from '../services/profileServices..js';

const apiGetProfile = async (req, res) => {
    if (!req.user) {
        const result = resData('Please login', 1, '');
        return res.status(400).json(result);
    }
    try {
        const result = await profileServices.getProfile(req.user.id);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiPostProfile = async (req, res) => {
    if (!req.user) {
        const result = resData('Please login', 1, '');
        return res.status(400).json(result);
    }
    try {
        const result = await profileServices.postProfile(req.body, req.user.id);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }

}

const profileController = { apiGetProfile, apiPostProfile };
export default profileController;