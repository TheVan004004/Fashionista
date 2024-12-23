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
        const { sort, page, limit } = req.query;
        const result = await adminServices.getInfoBuyTurnUser(sort, page, limit);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiGetProductsByMonth = async (req, res) => {
    try {
        const result = await adminServices.getProductsByMonth();
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiGetTotalSalesByMonth = async (req, res) => {
    try {
        const result = await adminServices.getTotalSalesByMonth();
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiGetBuyTurnByMonthOfProduct = async (req, res) => {
    try {
        const productId = req.params.product_id;
        const result = await adminServices.getBuyTurnByMonthOfProduct(productId);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiGetInfoProduct = async (req, res) => {
    try {
        const productId = req.params.product_id;
        const result = await adminServices.getInfoProduct(productId);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiGetAllOrders = async (req, res) => {
    try {
        const { status, page, limit } = req.query;
        const result = await adminServices.getAllOrders(status, page, limit);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiUpdateOrderAdmin = async (req, res) => {
    try {
        const orderId = parseInt(req.params.order_id);
        const result = await adminServices.updateOrderAdmin(orderId);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiDeleteProductDetail = async (req, res) => {
    try {
        const { product_id, color_id } = req.query;
        const result = await adminServices.deleteProductDetail(product_id, color_id);
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
    apiGetBuyTurnByMonthOfProduct,
    apiGetInfoProduct,
    apiGetAllOrders,
    apiUpdateOrderAdmin,
}
export default adminController;