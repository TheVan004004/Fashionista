import { db } from "../config/database.js";
import resData from "../helpers/jsonFormat.js";
import productServices from "./productServices.js";

const checkExistedProduct = async (name) => {
    const getAllProducts = await productServices.filterProducts({});
    const allProducts = getAllProducts.data;
    let foundProduct = allProducts.find((product) => product.name == name);
    return foundProduct ? foundProduct.id : -1;
}
const checkExistedColor = async (hex_code) => {
    const getAllColors = await productServices.getAllColors();
    const allColors = getAllColors.data;
    let foundColor = allColors.find((color) => color.hex_code == hex_code);
    return foundColor ? foundColor.id : -1;
}
const checkExistedCategory = async (name) => {
    const getAllCategories = await productServices.getAllCategories();
    const allCategories = getAllCategories.data;
    let foundCategory = allCategories.find((category) => category.name == name);
    return foundCategory ? foundCategory.id : -1;
}
const checkExistedSize = async (name) => {
    const getAllSize = await db.query(
        `SELECT *
         FROM size;`
    );
    const allSize = getAllSize.rows;
    let foundSize = allSize.find((size) => size.name == name);
    return foundSize ? foundSize.id : -1;
}

const addNewProductDetail = async (productDetailData) => {
    let { name, image, category_name, size_name, color_name, hex_code, quantity, price, sale } = productDetailData;

    //check exist
    let foundProductId = await checkExistedProduct(name);
    let foundColorId = await checkExistedColor(hex_code);
    let foundCategoryId = await checkExistedCategory(category_name);
    let foundSizeId = await checkExistedSize(size_name);

    // new product
    if (foundProductId == -1) {
        // new color
        if (foundColorId == -1) {
            const addNewColor = await db.query(
                `INSERT INTO color(name, hex_code)
                 VALUES ($1, $2)
                 RETURNING *;`,
                [color_name, hex_code]
            );
            foundColorId = addNewColor.rows[0].id;
        }
        //new category
        if (foundCategoryId == -1) {
            const addNewCategory = await db.query(
                `INSERT INTO categories(name)
                 VALUES ($1)
                 RETURNING *;`,
                [category_name]
            );
            foundCategoryId = addNewCategory.rows[0].id;
        }
        //update tables
        const insertProduct = await db.query( // insert products table
            `INSERT INTO products(name, image,category_id)
             VALUES ($1, $2,$3)
             RETURNING *;`,
            [name, image, foundCategoryId]
        );
        foundProductId = insertProduct.rows[0].id;
        const insertProductDetail = await db.query(
            `INSERT INTO product_details (product_id,image, size_id,color_id,buyturn, quantity, price, sale)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
             RETURNING *;`,
            [
                foundProductId,
                image,
                foundSizeId,
                foundColorId,
                0,
                quantity,
                price,
                sale
            ]
        );
        const result = resData('Add new product successfully', 0, insertProductDetail.rows[0]);
        return result;
    }
    // product exists but has new productDetail ('newColor' come with 'newImage')
    else {
        if (foundColorId == -1) {
            const addNewColor = await db.query(
                `INSERT INTO color(name, hex_code)
                 VALUES ($1, $2)
                 RETURNING *;`,
                [color_name, hex_code]
            );
            foundColorId = addNewColor.rows[0].id;
        }
        // get price and sale of product
        const getQuantitySaleCCurr = await db.query(
            `SELECT price, sale
             FROM product_details
             WHERE product_id = $1`,
            [foundProductId]
        );
        price = getQuantitySaleCCurr.rows[0].price;
        sale = getQuantitySaleCCurr.rows[0].sale;

        const insertProductDetail = await db.query(
            `INSERT INTO product_details (product_id,image, size_id,color_id,buyturn, quantity, price, sale)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
             RETURNING *;`,
            [
                foundProductId,
                image,
                foundSizeId,
                foundColorId,
                0,
                quantity,
                price,
                sale
            ]
        );
        const result = resData('Add new product successfully', 0, insertProductDetail.rows[0]);
        return result;
    }
}

const updateProduct = async (productId, updateData) => { //updateData {newName, newPrice, newSale}
    let { newName, newPrice, newSale } = updateData;
    newPrice = parseInt(newPrice);
    newSale = parseInt(newSale);

    //update tables: products, product_details
    await db.query(
        `UPDATE products
         SET name = $1
         WHERE id = $2;`,
        [newName, productId]
    );
    await db.query(
        `UPDATE product_details
         SET price =$1, sale = $2
         WHERE product_id =$3;`,
        [newPrice, newSale, productId]
    );
    const getAllProducts = await productServices.filterProducts({});
    const allProducts = getAllProducts.data;
    let updatedProduct = allProducts.find((product) => product.id == productId);
    const result = resData('Updated product successfully', 0, updatedProduct);
    return result;
}

const updateQuantityProductDetail = async (productDetailId, newQuantity) => {
    const { rows } = await db.query(
        `UPDATE product_details
         SET quantity = $1
         WHERE id = $2
         RETURNING *;`,
        [newQuantity, productDetailId]
    );
    const result = resData('Update quantity successfully', 0, rows[0]);
    return result;
}

const getInfoBuyTurnUser = async () => {
    // sum of quantity in order_details table
    const { rows } = await db.query(
        `SELECT users.id, username, fullname, role, phone , address, dob, sex, COALESCE(SUM(quantity), 0) as buyturn
         FROM users
         LEFT JOIN orders ON orders.user_id = users.id
		 LEFT JOIN order_details ON order_details.order_id = orders.id
         GROUP BY users.id, username, fullname, role, phone , address, dob, sex
         ORDER BY users.id ASC; `
    );

    const result = resData(`Get user buy turn information successfully`, 0, rows);
    return result;

}

const getProductsByMonth = async (month) => {
    // products is completed by month
    const { rows } = await db.query(
        `SELECT SUM(quantity) AS total_products_in_month
         FROM orders
         JOIN order_details ON order_details.order_id = orders.id
         WHERE EXTRACT(MONTH FROM created_at) = $1;`,
        [month]
    );
    const data = { ...rows[0], month: month };
    const result = resData(`Get total sold products successfully`, 0, data);
    return result;
}

const getTotalSalesByMonth = async (month) => {
    const { rows } = await db.query(
        `SELECT SUM(total)AS total_sales_in_month
         FROM orders
         WHERE EXTRACT(MONTH FROM created_at) = $1;`,
        [month]
    );
    const data = { ...rows[0], month: month };
    const result = resData(`Get total sales successfully`, 0, data);
    return result;
}

const adminServices = {
    addNewProductDetail,
    updateProduct,
    updateQuantityProductDetail,
    getInfoBuyTurnUser,
    getProductsByMonth,
    getTotalSalesByMonth,
}
export default adminServices;