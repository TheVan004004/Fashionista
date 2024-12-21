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
<<<<<<< HEAD
        res.json(result)
=======
        res.json(result);
>>>>>>> 96a02a4c59436e7cf11164fa5479170e08830cc1
    }
    catch (error) {
        console.log(`>>> Error getting: ${error}`);
        const result = resData('Server error', 1, '');
        res.status(500).json(result);
    }
<<<<<<< HEAD


}
const orderController = { apiOrder, apiUpdateOrder };
export default orderController;
=======
}

const orderController = { apiOrder, apiUpdateOrder };
export default orderController;
>>>>>>> 96a02a4c59436e7cf11164fa5479170e08830cc1
