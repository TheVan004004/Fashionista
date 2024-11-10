import { db, sql_command } from '../config/database.js';
import env from "dotenv";

env.config();
const port = process.env.PORT;
const hostname = process.env.DB_HOST;

// get all products function
const getAllProducts = async () => {
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
        products[i].image = `http://${hostname}:${port}/public/images/${products[i].image}.png`;
    }
    return products;
}

// remove vietnamese tones (input)
function removeVietnameseTones(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

const searchProducts = async (req, res) => {
    try {
        const allProducts = await getAllProducts();

        // filteredProducts will have product that function returns true
        const filteredProducts = allProducts.filter((product) => {
            let check = true;
            // filter by name, hex code color, price range, category name, brand name
            if (req.query.name) {
                const nameProduct = removeVietnameseTones(product.name).toLowerCase();
                const searchName = removeVietnameseTones(req.query.name).toLowerCase();
                check = check && nameProduct.includes(searchName);
            }
            if (req.query.color) {
                const colorProduct = product.color;
                const checkColor = colorProduct.findIndex((color) => color.hex_code == req.query.color)
                check = check && ((checkColor < 0) ? false : true);
            }
            if (req.query.price_range) {
                const price_parts = req.query.price_range.split('-');
                const price_start = price_parts[0], price_end = price_parts[1];
                const priceProduct = product.price;
                check = check && ((priceProduct >= price_start && priceProduct <= price_end) ? true : false);
            }
            if (req.query.category_name) {
                const categoryName = product.category_name;
                check = check && (categoryName == req.query.category_name);
            }
            if (req.query.brand_name) {
                const brandName = product.brand_name;
                check = check && (brandName == req.query.brand_name);
            }
            return check;
        })

        //sort by price asc(desc), total_buyturn desc, sale desc
        if (req.query.sort == "price_asc") {
            filteredProducts.sort((a, b) => a.price - b.price); // sort price asc
        }
        if (req.query.sort == "price_desc") {
            filteredProducts.sort((a, b) => b.price - a.price); // sort price desc
        }
        if (req.query.sort == "most_buyturn") {
            filteredProducts.sort((a, b) => b.total_buyturn - a.total_buyturn) // sort total_buyturn desc
        }
        if (req.query.sort == "sale_desc") {
            filteredProducts.sort((a, b) => b.sale - a.sale) // sort sale desc
        }

        res.json(filteredProducts);
    } catch (error) {
        console.log(`Error getting all products: ${error}`);
        res.status(500).json({ message: "Server error" });
    }
}

const getAllColors = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM color");
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting all colors" });
    }
}

export { searchProducts, getAllColors }