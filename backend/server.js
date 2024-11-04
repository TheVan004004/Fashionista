import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
import fs from 'fs';
import cors from "cors";
import { dirname } from "path";
import path from 'path';
import { fileURLToPath } from "url";

const app = express();
const port = 4000;
const __dirname = dirname(fileURLToPath(import.meta.url)); // get Fashionista's URL

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Fashionista",
    password: "100804", // use your password
    port: 5432
});
db.connect();

// Read .sql file
const sql = await fs.readFileSync('database.sql', 'utf8');
const sql_command = sql.split("----"); // Separate commands in the .sql file with "----", each commands is element of sql_command

//GET all Products data
app.get("/api/products", async (req, res) => {
    try {
        const query_command = sql_command[1];
        const result = await db.query(query_command);
        const products = result.rows;
        /*products which are  array have many objects. 
        Each obj includes id, name, image(only image name, not URL form), price, sale, brand and category name
        */

        // add 'color' and modify 'image' attribute in each obj of products
        for (let i = 0; i < products.length; i++) {

            // add property 'color' into each object of products
            const query_command = sql_command[2];
            const result = await db.query(query_command, [products[i].id]);
            const getColor = result.rows;
            const allColorByName = [], allColorByHexCode = [];
            getColor.forEach((color) => {
                allColorByName.push(color.color_name);
                allColorByHexCode.push(color.hex_code);
            })
            products[i].color_name = allColorByName;
            products[i].color_code = allColorByHexCode;

            // convert image into url
            products[i].image = path.join(__dirname + '/public/images', products[i].image + '.png');
        }
        res.json(products);
    } catch (error) {
        console.log(`Error getting all products: ${error}`);
        res.status(500).json({ message: "Server error" });
    }
})

// remove vietnamese tones (input)
function removeVietnameseTones(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}
//create function remove (data in database)
const query_remove = sql_command[sql_command.length - 1];
await db.query(query_remove);



// GET: filter by product name, by color, size, price_range, by category_id, by brand_id 
//(use dynamic query and price_range is string like "200-400")
app.get("/api/products/filter", async (req, res) => {
    try {
        // set dynamic query
        let query_command = 'SELECT * FROM products WHERE 1=1 ';
        const params = [];

        if (req.query.name) {
            const name = removeVietnameseTones(req.query.name);
            params.push(name);
            query_command += ` AND remove_vietnamese_tones(name) LIKE '%'||LOWER($${params.length})||'%'`;
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
            query_command += ` AND "price" BETWEEN $${params.length - 1} AND $${params.length}`;
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
