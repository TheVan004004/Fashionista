import { db, sql_command } from '../config/database.js';

const orderProductDetail = async (req, res) => {
    try {
        const product_id = req.params.id;
        //get image of product when you click
        const result = await db.query(sql_command[3], [product_id]);
        const colorCurrent = result.rows[0].hex_code;

        // select color, size
        const color = req.query.color || colorCurrent;
        const size = req.query.size || "M";
        let query_command = sql_command[4];
        const resultSelect = await db.query(query_command, [color, size]);

        res.json(resultSelect.rows);
    } catch (error) {
        console.log(`Error getting: ${error}`);
        res.status(500).json({ message: "Server error" });
    }
}

export { orderProductDetail };