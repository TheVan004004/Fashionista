import resData from "../helpers/jsonFormat.js";
import orderServices from "../services/orderServices.js";

const apiOrder = async (req, res) => {
    if (!req.user) {
        const result = resData('Vui lòng đăng nhập', 1, '');
        return res.status(400).json(result);
    }
    try {
        const result = await orderServices.order(req.user.id, req.body.listItems);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Lỗi server', 1, '');
        res.status(500).json(result);
    }
}

const apiUpdateOrder = async (req, res) => {
    if (!req.user) {
        const result = resData('Vui lòng đăng nhập', 1, '');
        return res.status(400).json(result);
    }
    try {
        const orderId = req.params.order_id;
        const result = await orderServices.updateStatusOrder(orderId);
        res.json(result);
    }
    catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Lỗi server', 1, '');
        res.status(500).json(result);
    }
}

const apiGetOrders = async (req, res) => {
    if (!req.user) {
        const result = resData('Vui lòng đăng nhập', 1, '');
        return res.status(400).json(result);
    }
    try {
        const userId = req.user.id;
        const { status, page, limit } = req.query;
        const result = await orderServices.getOrders(userId, status, page, limit);
        res.json(result);
    }
    catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Lỗi server', 1, '');
        res.status(500).json(result);
    }
}

const apiGetOrderInfo = async (req, res) => {
    try {
        const result = await orderServices.getOrderInfo(req.params.order_id);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Lỗi server', 1, '');
        res.status(500).json(result);
    }
}

const orderController = {
    apiOrder,
    apiUpdateOrder,
    apiGetOrders,
    apiGetOrderInfo,
};
export default orderController;