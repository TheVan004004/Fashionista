import { db } from "../config/database.js";
import resData from "../helpers/jsonFormat.js";

const order = async (listItems) => {
    // const userId = parseInt(req.params.user_id);

    // //order
    // const cartItems = await db.query(
    //     `SELECT product_details_id,price as price_product, cart_items.quantity as quantity
    //      FROM cart_items
    //      JOIN cart ON cart.id= cart_items.cart_id
    //      JOIN product_details ON product_details.id=cart_items.product_details_id
    //      WHERE user_id=$1`,
    //     [userId]
    // );
    // let total = 0; //total of a order
    // cartItems.rows.forEach((item) => { total += item.quantity * item.price_product });
    // const date = new Date();
    // const newOrder = await db.query(
    //     `INSERT INTO orders(user_id,status, total, created_at)
    //      VALUES ($1,$2,$3,$4)
    //      RETURNING *;`,
    //     [userId, 0, total, date]
    // )
    // const orderId = newOrder.rows[0].id;
    // cartItems.rows.forEach(async (item) => {
    //     const productDetailId = item.product_details_id;
    //     const quantity_cartItem = item.quantity;
    //     await db.query(
    //         `INSERT INTO order_details(order_id,product_details_id,price,quantity)
    //          VALUES ($1,$2,$3,$4);`,
    //         [orderId, productDetailId, item.quantity * item.price_product, quantity_cartItem]
    //     );

    //     //update buyTurn and quantity of product
    //     const updateResult = await db.query(
    //         `UPDATE product_details
    //          SET quantity = quantity - $1, buyturn = buyturn + $1
    //          WHERE id = $2 AND "quantity" >= $1;`,
    //         [quantity_cartItem, productDetailId]
    //     )
    //     if (updateResult.rowCount === 0) {
    //         throw new Error(`Product with ID ${productId} is out of stock or insufficient quantity.`);
    //     }

    // });

    // res.json(newOrder.rows[0]); // rows: Items detail
};

const orderServices = { order };
export default orderServices;