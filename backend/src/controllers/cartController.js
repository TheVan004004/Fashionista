import resData from "../helpers/jsonFormat.js";
import cartSerVices from "../services/cartServices.js";

const apiAddCartItem = async (req, res) => {
  if (!req.user) {
    const result = resData("Vui lòng đăng nhập", 1, "");
    return res.status(400).json(result);
  }
  try {
    const userId = req.user.id;
    const result = await cartSerVices.addCartItem(userId, req.body);
    res.json(result);
  } catch (error) {
    console.log(`>>> Error getting: ${error}`);
    const result = resData('Lỗi server', 1, "");
    res.status(500).json(result);
  }
};
const apiGetAllCartItems = async (req, res) => {
  if (!req.user) {
    const result = resData("Vui lòng đăng nhập", 1, "");
    return res.status(400).json(result);
  }
  try {
    const userId = req.user.id;
    const pageInfo = req.query;
    const result = await cartSerVices.getAllCartItems(userId, pageInfo);
    res.json(result);
  } catch (error) {
    console.log(`>>> Error getting: ${error}`);
    const result = resData('Lỗi server', 1, "");
    res.status(500).json(result);
  }
};
//Change color, size, quantity of item
const apiUpdateCartItem = async (req, res) => {
  if (!req.user) {
    const result = resData("Vui lòng đăng nhập", 1, "");
    return res.status(400).json(result);
  }
  try {
    const itemId = req.params.item_id;
    const result = await cartSerVices.updateCartItem(itemId, req.body);
    res.json(result);
  } catch (error) {
    console.log(`>>> Error getting: ${error}`);
    const result = resData('Lỗi server', 1, "");
    res.status(500).json(result);
  }
};
const apiDeleteCartItem = async (req, res) => {
  if (!req.user) {
    const result = resData("Vui lòng đăng nhập", 1, "");
    return res.status(400).json(result);
  }
  try {
    const itemId = req.params.item_id;
    const result = await cartSerVices.deleteCartItem(itemId);
    res.json(result);
  } catch (error) {
    console.log(`>>> Error getting: ${error}`);
    const result = resData('Lỗi server', 1, "");
    res.status(500).json(result);
  }
};

const cartController = {
  apiAddCartItem,
  apiGetAllCartItems,
  apiUpdateCartItem,
  apiDeleteCartItem,
};
export default cartController;
