import { db } from "../config/database.js";
import resData from "../helpers/jsonFormat.js";

const order = async (user_id, listItems) => {
    const userId = parseInt(user_id);
    const resCartItems = await db.query(
        `SELECT cart_items.id, product_details_id,price as price_product,sale, cart_items.quantity
         FROM cart_items
         JOIN cart ON cart.id= cart_items.cart_id
         JOIN product_details ON product_details.id=cart_items.product_details_id
         WHERE user_id=$1`,
        [userId]
    );
    let selectedItems = resCartItems.rows.filter((item) => {
        return listItems.findIndex((element) => element == item.id) !== -1;
    });
    let total = 0; //total of a order
    selectedItems.forEach((item) => { total += item.quantity * item.price_product * (100 - item.sale) / 100 });
    const date = new Date();
    const newOrder = await db.query(
        `INSERT INTO orders(user_id,status, total, created_at)
         VALUES ($1,$2,$3,$4)
         RETURNING *;`,
        [userId, 'Pending', total, date]
    )
    const orderId = newOrder.rows[0].id;
    for (const item of selectedItems) {
        const productDetailId = item.product_details_id;
        const quantityCartItem = item.quantity;
        await db.query(
            `INSERT INTO order_details(order_id,product_details_id,price,quantity)
             VALUES ($1,$2,$3,$4);`,
            [orderId, productDetailId, item.quantity * item.price_product * (100 - item.sale) / 100, quantityCartItem]
        );

        //update buyTurn and quantity of product_details
        db.query(
            `UPDATE product_details
             SET quantity = quantity - $1, buyturn = buyturn + $1
             WHERE id = $2;`,
            [quantityCartItem, productDetailId]
        );
        // delete ordered items in cart
        db.query(
            `DELETE FROM cart_items
             WHERE id = $1`,
            [item.id]
        );
    };
    const result = resData('Order successfully', 0, newOrder.rows[0]);
    return result;
}

const updateStatusOrder = async (orderId) => {
    const resultStatus = await db.query(
        `SELECT status
         FROM orders
         where id= $1`,
        [orderId]
    )
    if (resultStatus.row[0] == 'pending') {
        const { rows } = await db.query(
            `UPDATE orders
         SET status = $1
         WHERE id=$2
         RETURNING *;`,
            ['completed', orderId]
        )
        const result = resData('Update successfully', 0, rows[0]);
        return result;
    }
}
const orderServices = { order, updateStatusOrder };
export default orderServices;