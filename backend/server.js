import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
import cors from "cors";
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "ShopQuanAo", // use Van's database
    password: "100804", // use Van's password
    port: 5432
});
db.connect();

//GET all Products data
app.get("/api/products", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM products");
        const products = result.rows;
        res.json(products);
    } catch (error) {
        console.log(`Error getting product by name: ${error}`);
        res.status(500).json({ message: "Server error" });
    }
})

// GET: filter by product name, by (color, size, price_range, category_id), by category_id, by brand_id 
//(use dynamic query and price_range is string like "200-400")
app.get("/api/products/filter", async (req, res) => {
    try {
        // set dynamic query
        let query_command = 'SELECT * FROM products WHERE 1=1 ';
        const params = [];

        if (req.query.name) {
            params.push(req.query.name);
            query_command += ` AND LOWER(name) LIKE '%'||LOWER($${params.length})||'%'`;
        }
        if (req.query.color) {
            params.push(req.query.color);
            query_command += ` AND color=$${params.length}`;
        }
        if (req.query.size) {
            params.push(req.query.size);
            query_command += ` AND size= $${params.length}`;
        }
        if (req.query.price_range) {
            const price_parts = req.query.price_range.split('-');
            const price_start = price_parts[0], price_end = price_parts[1];
            params.push(price_start);
            params.push(price_end);
            query_command += ` AND "price (1000)" BETWEEN $${params.length - 1} AND $${params.length}`;
        }
        if (req.query.category_id) {
            params.push(req.query.category_id);
            query_command += ` AND category_id=$${params.length}`;
        }
        if (req.query.brand_id) {
            params.push(req.query.brand_id);
            query_command += ` AND brand_id= $${params.length}`;
        }

        //query
        const result = await db.query(query_command, params);
        const products = result.rows;
        if (products.length > 0)
            res.json(products);
        else
            res.status(404).json({ message: "Product not found" });

    } catch (error) {
        console.log(`Error getting product: ${error}`);
        res.status(500).json({ message: "Server error" });
    }
})


app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});
