import { db } from '../config/database.js';
const addOrder = async (req, res) => {
    const userId = req.params.user_id;
    const productDetailId = req.query.productDetail_id;
    const quantity_cartItem = req.query.quantity_cartItem;

    try {
        const resultOrder = await db.query(
            `SELECT id FROM orders WHERE user_id=$1;`,
            [userId]
        )
        const orderId = resultOrder.rows[0].id;
        const date = new Date();
        const { rows } = await db.query(
            `INSERT INTO order-details(order_id,product_id,quantity,date)
             VALUES ($1,$2,$3,$4)
             RETURNING *;`,
            [orderId, productDetailId, quantity_cartItem, date]
        );
        res.json(rows); // rows: Items detail
    } catch (error) {
        console.log(`Error getting: ${error}`);
        res.status(500).json({ message: "Sever error" });
    }
}
const apiOrder = async (req, res) => {
    try {
        const userId = req.params.id; // Lấy userId từ URL parameter

        // Cập nhật bảng Order_Details và Product_Details
        const query = `
        SELECT od.product_id, od.quantity
        FROM order_details od
        JOIN orders o ON od.order_id = o.id
        WHERE o.user_id = $1;
        `;
        const result = await db.query(query, [userId]);

        const products = result.rows.map(row => ({
            product_id: row.product_id,
            quantity: row.quantity
        }));

        const updateProductQuery = `
            UPDATE "product_details"
            SET "quantity" = "quantity" - $1, "buyturn" = "buyturn" + $1
            WHERE "product_id" = $2 AND "quantity" >= $1;
        `;

        for (const product of products) {
            const { productId, quantity, price } = product;

            // Cập nhật số lượng và buyturn trong bảng Product_Details
            const updateResult = await db.query(updateProductQuery, [quantity, productId]);
            if (updateResult.rowCount === 0) {
                throw new Error(`Product ID ${productId} is out of stock or insufficient quantity.`);
            }

        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        await db.query('ROLLBACK');
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { addOrder, apiOrder };