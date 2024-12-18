import { db } from '../config/database.js';
import env from "dotenv";
import productServices from './productServices.js';
import resData from '../helpers/jsonFormat.js';

env.config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

const searchProductDetail = async (productId, searchData) => {
    const listProduct = await productServices.getAllProducts();
    const productCurr = listProduct.data.find((product) => product.id == productId);
    const colorCurr = productCurr.color[0].hex_code;

    const color = searchData.color || colorCurr;
    const size = searchData.size || "M";
    const { rows } = await db.query(
        `SELECT product_details.id,products.name, product_id, product_details.image, size.name as size_name, color.name as color_name, hex_code, price, sale, categories.name as category_name, buyturn, quantity
         FROM product_details
         JOIN products ON products.id=product_details.product_id
         JOIN categories ON products.category_id=categories.id
         JOIN color ON product_details.color_id=color.id
         JOIN size ON product_details.size_id=size.id
         WHERE product_id=$1 AND hex_code= $2 AND size.name=$3; `,
        [productId, color, size]
    );
    const data = { ...rows[0], image: `http://${hostname}:${port}/public/images/${rows[0].image}.png` };
    const result = resData(`Get Product details with id = ${data.id} successfully`, 0, data);
    return result;
}

const productDetailServices = { searchProductDetail };
export default productDetailServices;