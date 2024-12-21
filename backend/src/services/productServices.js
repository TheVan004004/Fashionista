import { db } from '../config/database.js';
import resData from '../helpers/jsonFormat.js';
import pagination from '../helpers/paginate.js';
import env from "dotenv";


env.config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

const getAllProducts = async () => {
    const { rows } = await db.query(
        `SELECT products.id,products.name, products.image,price, sale, categories.name AS category_name, SUM(buyturn) AS total_buyturn, SUM(quantity) AS total_quantity
         FROM products
         JOIN categories ON categories.id=products.category_id
         JOIN product_details ON product_details.product_id=products.id
         GROUP BY products.id,products.name, products.image,price, sale, categories.name
         ORDER BY products.id ASC`
    );
    let data = [];
    for (let product of rows) {
        const productId = product.id;
        const colorData = await db.query(
            `SELECT DISTINCT ON (color_id) color.name as color_name,hex_code
             FROM products
             JOIN product_details ON product_details.product_id=products.id
             JOIN color ON color.id=product_details.color_id
             WHERE product_details.product_id= $1;`,
            [productId]
        );
        data.push({ ...product, image: `http://${hostname}:${port}/public/images/${product.image}.png`, color: colorData.rows });

    };
    const result = resData('Get products successfully', 0, data);
    return result;
};


// remove vietnamese tones (input)
function removeVietnameseTones(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};
const filterProducts = async (filterData) => {
    let resGetAllProducts = await getAllProducts();
    let allProducts = resGetAllProducts.data;
    allProducts = allProducts.filter((product) => {
        let check = true;
        // filter by name, hex code color, price range, category name, brand name
        if (filterData.name) {
            const nameProduct = removeVietnameseTones(product.name).toLowerCase();
            const searchName = removeVietnameseTones(filterData.name).toLowerCase();
            check = check && nameProduct.includes(searchName);
        }
        if (filterData.color) {
            const colorProduct = product.color;
            const checkColor = colorProduct.findIndex((color) => color.hex_code == filterData.color)
            check = check && ((checkColor < 0) ? false : true);
        }
        if (filterData.price_range) {
            const price_parts = filterData.price_range.split('-');
            const price_start = price_parts[0], price_end = price_parts[1];
            const priceProduct = product.price;
            check = check && (priceProduct >= price_start * 1000 && priceProduct <= price_end * 1000);
        }
        if (filterData.category_name) {
            const categoryName = product.category_name;
            check = check && (categoryName == filterData.category_name);
        }
        return check;
    });

    //sort by price asc(desc), total_buyturn desc, sale desc
    if (filterData.sort == "price_asc") {
        allProducts.sort((a, b) => a.price * (100 - a.sale) - b.price * (100 - b.sale)); // sort price asc
    }
    if (filterData.sort == "price_desc") {
        allProducts.sort((a, b) => b.price * (100 - b.sale) - a.price * (100 - a.sale)); // sort price desc
    }
    if (filterData.sort == "most_buyturn") {
        allProducts.sort((a, b) => b.total_buyturn - a.total_buyturn) // sort total_buyturn desc
    }
    if (filterData.sort == "sale_desc") {
        allProducts.sort((a, b) => b.sale - a.sale) // sort sale desc
    }

    allProducts = pagination(allProducts, parseInt(filterData.page), parseInt(filterData.limit));
    const result = resData('Get products successfully', 0, allProducts.newItems);
    return result;
}

const getAllColors = async () => {
    const { rows } = await db.query(
        `SELECT * FROM color`
    );
    const result = resData('Get all colors successfully', 0, rows);
    return result;
}

const getAllCategories = async () => {
    const { rows } = await db.query(
        `SELECT * FROM categories`
    );
    const result = resData('Get all categories', 0, rows);
    return result;
}

const productServices =
{
    getAllProducts,
    filterProducts,
    getAllColors,
    getAllCategories,
}
export default productServices;