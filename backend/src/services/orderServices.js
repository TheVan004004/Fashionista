import { db } from "../config/database.js";
import resData from "../helpers/jsonFormat.js";
import pagination from "../helpers/paginate.js";

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
  selectedItems.forEach((item) => {
    total += (item.quantity * item.price_product * (100 - item.sale)) / 100;
  });
  const date = new Date();
  const newOrder = await db.query(
    `INSERT INTO orders(user_id,status, total, created_at)
         VALUES ($1,$2,$3,$4)
         RETURNING *;`,
    [userId, "pending", total, date]
  );
  const orderId = newOrder.rows[0].id;
  for (const item of selectedItems) {
    const productDetailId = item.product_details_id;
    const quantityCartItem = item.quantity;
    await db.query(
      `INSERT INTO order_details(order_id,product_details_id,price,quantity)
             VALUES ($1,$2,$3,$4);`,
      [
        orderId,
        productDetailId,
        (item.quantity * item.price_product * (100 - item.sale)) / 100,
        quantityCartItem,
      ]
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
  }
  const result = resData("Đặt hàng thành công", 0, newOrder.rows[0]);
  return result;
};

const updateStatusOrder = async (orderId) => {
  const resultStatus = await db.query(
    `SELECT status
         FROM orders
         where id= $1`,
    [orderId]
  );
  if (resultStatus.rows[0].status == "processing") {
    const { rows } = await db.query(
      `UPDATE orders
         SET status = $1
         WHERE id=$2
         RETURNING *;`,
      ["completed", orderId]
    );
    const result = resData("Cập nhật thành công", 0, rows[0]);
    return result;
  }
};

const getOrders = async (userId, status, page, limit) => {
  if (!status) {
    let { rows } = await db.query(
      `SELECT id as order_id, created_at, total, status
             FROM orders
             WHERE user_id = $1
             ORDER BY order_id ASC;`,
      [userId]
    );
    rows = rows.map((item) => {
      const created_at = item.created_at;
      const created_at_vn = new Date(created_at).toLocaleDateString('vi-VN', { timeZone: "Asia/Bangkok" });
      return { ...item, created_at: created_at_vn }
    });
    rows = pagination(rows, parseInt(page), parseInt(limit))
    const data = {
      orders: rows.newItems,
      pageInfo: rows.pageInfo
    }

    const result = resData(`Lấy tất cả đơn hàng thành công`, 0, data);
    return result;
  }
  let { rows } = await db.query(
    `SELECT id as order_id, created_at, total, status
         FROM orders
         WHERE user_id = $1
         AND status = $2
         ORDER BY order_id ASC;`,
    [userId, status]
  );
  rows = rows.map((item) => {
    const created_at = item.created_at;
    const created_at_vn = new Date(created_at).toLocaleDateString('vi-VN', { timeZone: "Asia/Bangkok" });
    return { ...item, created_at: created_at_vn }
  })
  rows = pagination(rows, parseInt(page), parseInt(limit));
  const data = {
    orders: rows.newItems,
    pageInfo: rows.pageInfo
  }

  const result = resData(`Lấy các đơn hàng thành công`, 0, data);
  return result;
};

const getOrderInfo = async (orderId) => {
  const { rows } = await db.query(
    `SELECT products.name, color.name AS color_name, size.name AS size_name, product_details.price AS price, product_details.sale, order_details.quantity
FROM orders
JOIN order_details ON order_details.order_id = orders.id
JOIN product_details ON product_details.id = order_details.product_details_id
JOIN color ON color.id = product_details.color_id
JOIN size ON size.id = product_details.size_id
JOIN products ON products.id = product_details.product_id
WHERE orders.id = $1 
ORDER BY order_details.id ASC`,
    [orderId]
  );

  const result = resData("Lấy thông tin của đơn hàng thành công", 0, rows);
  return result;
};

const orderServices = {
  order,
  updateStatusOrder,
  getOrders,
  getOrderInfo,
};
export default orderServices;
