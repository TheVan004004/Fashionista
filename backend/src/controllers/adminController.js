import resData from "../helpers/jsonFormat.js";
import adminServices from "../services/adminServices.js";
import path from 'path';

const apiAddNewProductDetail = async (req, res) => {
    try {
        //update tables:
        // product_details: image, size, color, quantity, price, sale 
        // product: name, image, category_id (refer categories)
        const imageNewProduct = path.parse(req.file.originalname).name; // get only name (not has tail like '.png')
        const newProductDetailInfo = { ...req.body, image: imageNewProduct }
        const result = await adminServices.addNewProductDetail(newProductDetailInfo);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiUpdateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.product_id);
        const result = await adminServices.updateProduct(productId, req.body);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiUpdateQuantityProductDetail = async (req, res) => {
    try {
        const productDetailId = parseInt(req.params.product_details_id);
        const newQuantity = parseInt(req.body.new_quantity);
        const result = await adminServices.updateQuantityProductDetail(productDetailId, newQuantity);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiGetInfoBuyTurnUser = async (req, res) => {
    try {
        const result = await adminServices.getInfoBuyTurnUser();
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiGetProductsByMonth = async (req, res) => {
    try {
        const month = parseInt(req.params.month);
        const result = await adminServices.getProductsByMonth(month);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiGetTotalSalesByMonth = async (req, res) => {
    try {
        const month = parseInt(req.params.month);
        const result = await adminServices.getTotalSalesByMonth(month);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiGetAllStatusOrderPending = async (req, res) => {
    try {
        const result = await adminServices.getAllStatusOrderPending();
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiUpdateOrderAdmin = async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const result = await adminServices.updateStatusOrderAdmin(orderId);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const adminController = {
    apiAddNewProductDetail,
    apiUpdateProduct,
    apiUpdateQuantityProductDetail,
    apiGetInfoBuyTurnUser,
    apiGetProductsByMonth,
    apiGetTotalSalesByMonth,
    apiGetAllStatusOrderPending,
    apiUpdateOrderAdmin
}
export default adminController;