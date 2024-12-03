import { db, sql_command } from '../config/database.js';

const addCartItem = async (req, res) => {
    const userId = req.params.user_id;
    const productDetailId = req.query.productDetail_id;
    const quantity_cartItem = req.query.quantity_cartItem;

    try {
        const resultCart = await db.query(
            `SELECT id FROM cart WHERE user_id=$1;`,
            [userId]
        )
        const cartId = resultCart.rows[0].id;
        const { rows } = await db.query(
            `INSERT INTO cart_items(cart_id,product_details_id,quantity)
             VALUES ($1,$2,$3)
             RETURNING *;`,
            [cartId, productDetailId, quantity_cartItem]
        );
        res.json(rows); // rows: Items detail
    } catch (error) {
        console.log(`Error getting: ${error}`);
        res.status(500).json({ message: "Sever error" });
    }
}
const getAllCartItems = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const resultCart = await db.query(
            `SELECT id FROM cart WHERE user_id=$1;`,
            [userId]
        )
        const cartId = resultCart.rows[0].id;
        const { rows } = await db.query(sql_command[5], [cartId]);
        res.json(rows); // rows: Items detail
    } catch (error) {
        console.log(`Error getting: ${error}`);
        res.status(500).json({ message: "Sever error" });
    }
}
//Change color, size, quantity of item
const updateCartItem = async (req, res) => {
    try {
        const itemId = req.params.item_id;
        //search current color, size, quantity
        const resultProductDetailId = await db.query(
            `SELECT product_id,size.name as size_name, color.hex_code, cart_items.quantity
             FROM cart_items
             JOIN product_details ON product_details.id= cart_items.product_details_id
             JOIN size ON size.id=product_details.size_id
             JOIN color ON color.id=product_details.color_id
             WHERE cart_items.id=$1`,
            [itemId]
        );
        const product_id = resultProductDetailId.rows[0].product_id;
        const colorCurr = resultProductDetailId.rows[0].hex_code;
        const sizeCurr = resultProductDetailId.rows[0].size_name;
        const quantityCurr = resultProductDetailId.rows[0].quantity;

        const color = req.query.color || colorCurr;
        const size = req.query.size || sizeCurr;
        const quantity = req.query.quantity || quantityCurr;

        const result = await db.query(sql_command[4], [product_id, color, size]);
        const product_details_id = result.rows[0].id;
        //update cart_items
        const resultItem = await db.query(
            `UPDATE cart_items
             SET product_details_id = $1, quantity=$2
             WHERE id=$3
             RETURNING *;`,
            [product_details_id, quantity, itemId]
        )
        res.json(resultItem.rows[0]);
    } catch (error) {
        console.log(`Error getting: ${error}`);
        res.status(500).json({ message: "Sever error" });
    }
}
const deleteCartItem = async (req, res) => {
    try {
        const itemId = req.params.item_id;
        const { rows } = await db.query(
            `DELETE FROM cart_items
           WHERE id=$1
           RETURNING *`,
            [itemId]
        );
        res.json({ message: 'Delete successful', ItemDeleted: rows[0] });
    } catch (error) {
        console.log(`Error getting: ${error}`);
        res.status(500).json({ message: "Sever error" });
    }
}
export { addCartItem, getAllCartItems, updateCartItem, deleteCartItem }