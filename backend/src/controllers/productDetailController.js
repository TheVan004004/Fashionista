import resData from '../helpers/jsonFormat.js';
import productDetailServices from '../services/productDetailServices.js';

const apiSearchProductDetail = async (req, res) => {
    try {
        const result = await productDetailServices.searchProductDetail(req.params.id, req.query);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const productDetailController = { apiSearchProductDetail }
export default productDetailController;