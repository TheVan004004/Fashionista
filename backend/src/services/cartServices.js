import { db } from "../config/database.js";
import resData from "../helpers/jsonFormat.js";
import env from "dotenv";
import pagination from "../helpers/paginate.js";

env.config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

const addCartItem = async (userId, cartItemData) => {
  const product_details_id = cartItemData?.product_details_id;
  const quantity = parseInt(cartItemData?.quantity);

  // check quantity whether quantity > quantity of product_details
  const compare = await db.query(
    `SELECT product_details.quantity
         FROM product_details
         WHERE id = $1 `,
    [product_details_id]
  );
  console.log("check", quantity, product_details_id);
  console.log("compare", compare);
  if (quantity > compare.rows[0].quantity) {
    const result = resData("Limited quantity", 0, "");
    return result;
  }

  //order
  const resultCart = await db.query(`SELECT id FROM cart WHERE user_id=$1;`, [
    userId,
  ]);
  const cartId = resultCart.rows[0].id;

  // checkExist product_detail in cart
  const getProductDetail = await db.query(
    `SELECT product_details_id,quantity
         FROM cart_items
         WHERE product_details_id=$1 
         AND cart_id=$2`,
    [product_details_id, cartId]
  );

  if (getProductDetail.rows.length > 0) {
    const { rows } = await db.query(
      `UPDATE cart_items
             SET quantity = $1
             WHERE product_details_id=$2 
             AND cart_id=$3
             RETURNING *`,
      [quantity + getProductDetail.rows[0].quantity, product_details_id, cartId]
    );
    const result = resData(
      "Update quantity of item that added in cart",
      0,
      rows[0]
    );
    return result;
  }
  const { rows } = await db.query(
    `INSERT INTO cart_items(cart_id,product_details_id,quantity)
             VALUES ($1,$2,$3)
             RETURNING *;`,
    [cartId, product_details_id, quantity]
  );
  const result = resData("Add item into the cart successfully", 0, rows[0]);
  return result;
};

const getAllCartItems = async (userId, pageInfo) => {
  const resultCart = await db.query(`SELECT id FROM cart WHERE user_id=$1;`, [
    userId,
  ]);
  const cartId = resultCart.rows[0].id;
  let { rows } = await db.query(
    `SELECT cart_items.id as item_id, cart_id,product_id, product_details.id as product_details_id,cart_items.quantity as quantity_item ,products.name, product_details.image, size.name as size_name, color.name as color_name, hex_code, price, sale, categories.name as category_name, buyturn, product_details.quantity
         FROM cart_items
         JOIN product_details ON product_details.id=cart_items.product_details_id
         JOIN products ON products.id=product_details.product_id
         JOIN categories ON products.category_id=categories.id
         JOIN color ON product_details.color_id=color.id
         JOIN size ON product_details.size_id=size.id
         WHERE cart_id=$1;`,
    [cartId]
  );
  rows = rows.map((item) => {
    return {
      ...item,
      image: `http://${hostname}:${port}/public/images/${item.image}.png`,
    };
  });
  rows = pagination(rows, parseInt(pageInfo.page), parseInt(pageInfo.limit));
  const data = {
    cartItems: rows.newItems,
    pageInfo: rows.pageInfo
  }
  const result = resData("Get all items of cart successfully", 0, data);
  return result;
};

const deleteCartItem = async (itemId) => {
  const { rows } = await db.query(
    `DELETE FROM cart_items
       WHERE id=$1
       RETURNING *`,
    [itemId]
  );
  const result = resData(`Item with id=${rows[0].id} was deleted`, 0, rows[0]);
  return result;
};

const updateCartItem = async (itemId, updateData) => {
  //search current color, size, quantity
  const resultProductDetailId = await db.query(
    `SELECT product_id,cart_id,product_details_id,size.name as size_name, color.hex_code, cart_items.quantity
         FROM cart_items
         JOIN product_details ON product_details.id= cart_items.product_details_id
         JOIN size ON size.id=product_details.size_id
         JOIN color ON color.id=product_details.color_id
         WHERE cart_items.id=$1`,
    [itemId]
  );
  const productId = resultProductDetailId.rows[0].product_id;
  const colorCurr = resultProductDetailId.rows[0].hex_code;
  const sizeCurr = resultProductDetailId.rows[0].size_name;
  const quantityCurr = resultProductDetailId.rows[0].quantity;

  const color = updateData.color || colorCurr;
  const size = updateData.size || sizeCurr;
  const quantity = parseInt(updateData.quantity) || quantityCurr;
  const searchProductDetail = await db.query(
    `SELECT product_details.id,products.name, product_id, product_details.image, size.name as size_name, color.name as color_name, hex_code, price, sale, categories.name as category_name, buyturn, quantity
         FROM product_details
         JOIN products ON products.id=product_details.product_id
         JOIN categories ON products.category_id=categories.id
         JOIN color ON product_details.color_id=color.id
         JOIN size ON product_details.size_id=size.id
         WHERE product_id=$1 AND hex_code= $2 AND size.name=$3; `,
    [productId, color, size]
  );

  const product_details_id = searchProductDetail.rows[0].id;
  // checkExist product_detail in cart
  const cartId = resultProductDetailId.rows[0].cart_id;
  const getProductDetail = await db.query(
    `SELECT product_details_id,quantity
         FROM cart_items
         WHERE product_details_id=$1 
         AND cart_id=$2
         AND product_details_id!=$3`,
    [product_details_id, cartId, resultProductDetailId.rows[0].product_details_id]
  );
  if (getProductDetail.rows.length > 0) {
    const { rows } = await db.query(
      `UPDATE cart_items
             SET quantity = $1
             WHERE product_details_id=$2 
             AND cart_id=$3
             RETURNING *`,
      [quantity + getProductDetail.rows[0].quantity, product_details_id, cartId]
    );
    await db.query(
      `DELETE FROM cart_items
           WHERE id=$1`,
      [itemId]
    );
    const result = resData(
      "Update quantity of item that added in cart",
      0,
      rows[0]
    );
    return result;
  }
  //update cart_items
  const { rows } = await db.query(
    `UPDATE cart_items
         SET product_details_id = $1, quantity=$2
         WHERE id=$3
         RETURNING *;`,
    [product_details_id, quantity, itemId]
  );

  const result = resData("Update successfully", 0, rows[0]);
  return result;
};

const cartSerVices = {
  addCartItem,
  getAllCartItems,
  updateCartItem,
  deleteCartItem,
};
export default cartSerVices;
