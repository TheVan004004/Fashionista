import resData from "../helpers/jsonFormat.js";
import orderServices from "../services/orderServices.js";

const apiOrder = async (req, res) => {
    if (!req.user) {
        const result = resData('Please login', 0, '');
        return res.status(400).json(result);
    }
    try {
        const result = await orderServices.order(req.user.id, req.body.listItems);
        res.json(result);
    } catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
}

const apiUpdateOrder = async (req, res) => {
    if (!req.user) {
        const result = resData('Please login', 0, '');
        return res.status(400).json(result);
    }
    try {
        const orderId = req.params.order_id;
        const result = await orderServices.updateStatusOrder(orderId);
        res.json(result)
    }
    catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }


}
const orderController = { apiOrder, apiUpdateOrder };
export default orderController;
