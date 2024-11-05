import path from 'path';
import { db, sql_command } from '../config/database.js';
import { dirname } from "path";
import { fileURLToPath } from "url";


const getAllProducts = async (req, res) => {
    try {
        const query_command = sql_command[1];
        const result = await db.query(query_command);
        const products = result.rows;
        /*products which are  array have many objects. 
        Each obj includes id, name, image(only image name, not URL form), price, sale, brand and category name
        */

        // add 'color' and modify 'image' attribute in each obj of products
        //First, get backend's url
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const __srcURL = dirname(__dirname);
        for (let i = 0; i < products.length; i++) {

            // add property 'color' into each object of products
            const query_command = sql_command[2];
            const result = await db.query(query_command, [products[i].id]);
            const getColor = result.rows;
            const allColor = [];
            getColor.forEach((color) => {
                const colorObject = {
                    name: color.color_name,
                    hex_code: color.hex_code
                }
                allColor.push(colorObject);
            })
            products[i].color = allColor;

            // convert image into url
            products[i].image = path.join(__srcURL + '/public/images', products[i].image + '.png');
        }
        res.json(products);
    } catch (error) {
        console.log(`Error getting all products: ${error}`);
        res.status(500).json({ message: "Server error" });
    }
}

export { getAllProducts }