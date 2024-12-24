import resData from '../helpers/jsonFormat.js';
import productServices from '../services/productServices.js';

const apiFilteredProducts = async (req, res) => {
    try {
        const result = await productServices.filterProducts(req.query);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Lỗi server', 1, '');
        res.status(500).json(result);
    }
}

const apiGetAllColors = async (req, res) => {
    try {
        const result = await productServices.getAllColors();
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Lỗi server', 1, '');
        res.status(500).json(result);
    }
}

const apiGetAllCategories = async (req, res) => {
    try {
        const result = await productServices.getAllCategories();
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Lỗi server', 1, '');
        res.status(500).json(result);
    }
}

const productController =
{
    apiFilteredProducts,
    apiGetAllColors,
    apiGetAllCategories,
};
export default productController;