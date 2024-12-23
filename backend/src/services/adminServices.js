import { db } from "../config/database.js";
import resData from "../helpers/jsonFormat.js";
import pagination from "../helpers/paginate.js";
import productServices from "./productServices.js";
import env from "dotenv";


env.config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

const checkExistedProduct = async (name) => {
    const getAllProducts = await productServices.filterProducts({});
    const allProducts = getAllProducts.data.products;
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
    const allProducts = getAllProducts.data.products;
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

const getInfoBuyTurnUser = async (sort, page, limit) => {
    // sum of quantity in order_details table
    let { rows } = await db.query(
        `SELECT users.id, username, fullname, role, phone , address, dob, sex, COALESCE(SUM(quantity), 0) as buyturn
         FROM users
         LEFT JOIN orders ON orders.user_id = users.id
		 LEFT JOIN order_details ON order_details.order_id = orders.id
         GROUP BY users.id, username, fullname, role, phone , address, dob, sex
         ORDER BY users.id ASC; `
    );
    //sort
    if (sort == 'asc') {
        rows.sort((a, b) => a.buyturn - b.buyturn);
    }
    if (sort == 'desc') {
        rows.sort((a, b) => b.buyturn - a.buyturn);
    }
    rows = pagination(rows, parseInt(page), parseInt(limit));
    const data = {
        infoUserBuyTurn: rows.newItems,
        pageInfo: rows.pageInfo
    }
    const result = resData(`Get user buy turn information successfully`, 0, data);
    return result;

}

// a month
const getProductsByAMonth = async (month) => {
    const { rows } = await db.query(
        `SELECT SUM(quantity) AS total_products_in_month
         FROM orders
         JOIN order_details ON order_details.order_id = orders.id
         WHERE EXTRACT(MONTH FROM created_at) = $1;`,
        [month]
    );
    const data = { ...rows[0], month: month };
    return data;
}
const getTotalSalesByAMonth = async (month) => {
    const { rows } = await db.query(
        `SELECT SUM(total)AS total_sales_in_month
         FROM orders
         WHERE EXTRACT(MONTH FROM created_at) = $1;`,
        [month]
    );
    const data = { ...rows[0], month: month };
    return data;
}
const getBuyTurnByAMonthOfProduct = async (month, productId) => {
    const { rows } = await db.query(
        `SELECT  SUM(order_details.quantity) AS total_buyturn
         FROM orders
         JOIN order_details ON order_details.order_id = orders.id
         JOIN product_details ON product_details.id = order_details.product_details_id
         WHERE EXTRACT(MONTH FROM created_at) = $1
         AND product_details.product_id = $2
         GROUP BY product_details.product_id;`,
        [month, productId]
    );
    const data = { ...rows[0], month: month };
    return data;
}
const getBuyTurnByAMonthOfProductColor = async (month, product_id, color_id) => {
    const { rows } = await db.query(
        `SELECT SUM(order_details.quantity) AS total_buyturn
         FROM orders
         JOIN order_details ON order_details.order_id = orders.id
         JOIN product_details ON product_details.id = order_details.product_details_id
         WHERE EXTRACT(MONTH FROM created_at) = $1
         AND product_details.product_id = $2
         AND color_id=$3
         GROUP BY color_id;`,
        [month, product_id, color_id]
    )
    const data = { ...rows[0], month: month };
    return data;
}


// a year (12 months)
const getProductsByMonth = async () => {
    let data = [];
    for (let i = 1; i <= 12; i++) {
        let dataAMonth = await getProductsByAMonth(i);
        if (!dataAMonth.total_products_in_month) {
            dataAMonth.total_products_in_month = 0;
        }
        data.push(dataAMonth);
    }
    const result = resData('Get total sold products by month successfully', 0, data);
    return result;
}

const getTotalSalesByMonth = async () => {
    let data = [];
    for (let i = 1; i <= 12; i++) {
        let dataAMonth = await getTotalSalesByAMonth(i);
        if (!dataAMonth.total_sales_in_month) {
            dataAMonth.total_sales_in_month = 0;
        }
        data.push(dataAMonth);
    }
    const result = resData('Get total sales by month successfully', 0, data);
    return result;
}

const getBuyTurnByMonthOfProduct = async (productId) => {
    let data = [];
    for (let i = 1; i <= 12; i++) {
        let dataAMonth = await getBuyTurnByAMonthOfProduct(i, productId);
        if (!dataAMonth.total_buyturn) {
            dataAMonth.total_buyturn = 0;
        }
        data.push(dataAMonth);
    }
    const result = resData('Get buy turn by month successfully', 0, data);
    return result;
}

const getInfoProduct = async (productId) => {
    // search product
    const getProduct = await db.query(
        `SELECT products.id,products.name, products.image,price, sale, categories.name AS category_name, SUM(buyturn) AS total_buyturn, SUM(quantity) AS total_quantity
         FROM products
         JOIN categories ON categories.id=products.category_id
         JOIN product_details ON product_details.product_id=products.id
         WHERE products.id = $1
         GROUP BY products.id,products.name, products.image,price, sale, categories.name`,
        [productId]
    );
    const searchedProduct = getProduct.rows[0];
    const colorData = await db.query(
        `SELECT DISTINCT ON (color_id) color_id, color.name as color_name,hex_code
         FROM products
         JOIN product_details ON product_details.product_id=products.id
         JOIN color ON color.id=product_details.color_id
         WHERE product_details.product_id= $1;`,
        [productId]
    );
    let data = { ...searchedProduct, image: `http://${hostname}:${port}/public/images/${searchedProduct.image}.png`, color: colorData.rows };

    //search product_details belongs this product
    let listProductsInfoByColor = [];
    for (let color of colorData.rows) {
        let itemOfList = {
            color_id: color.color_id,
            color_name: color.color_name,
            productInfoByColor: []
        }
        for (let i = 1; i <= 12; i++) {
            let dataAMonth = await getBuyTurnByAMonthOfProductColor(i, productId, color.color_id);
            if (!dataAMonth.total_buyturn) {
                dataAMonth.total_buyturn = 0;
            }
            itemOfList.productInfoByColor.push(dataAMonth);
        }
        listProductsInfoByColor.push(itemOfList);
    }

    data = { ...data, listProductsInfoByColor: listProductsInfoByColor };


    const result = resData('Get product info successfully', 0, data);
    return result;

}

const getAllOrders = async (status, page, limit) => {
    if (!status) {
        let { rows } = await db.query(
            `SELECT orders.id AS order_id,fullname, phone, address,total, created_at, status
            FROM orders
			JOIN users ON users.id = orders.user_id
            ORDER BY orders.id ASC;`
        );
        rows = pagination(rows, page, limit)
        const data = {
            orders: rows.newItems,
            pageInfo: rows.pageInfo
        }

        const result = resData(`Get all orders successfully`, 0, data);
        return result;
    }
    let { rows } = await db.query(
        `SELECT orders.id AS order_id,fullname, phone, address,total, created_at, status
            FROM orders
			JOIN users ON users.id = orders.user_id
            WHERE status = $1
            ORDER BY orders.id ASC;`,
        [status]
    );
    rows = pagination(rows, page, limit)
    const data = {
        orders: rows.newItems,
        pageInfo: rows.pageInfo
    }

    const result = resData(`Get orders successfully`, 0, data);
    return result;
}

const updateOrderAdmin = async (orderId) => {
    const resultStatus = await db.query(
        `SELECT status
         FROM orders
         where id= $1`,
        [orderId]
    )
    if (resultStatus.rows[0].status == 'pending') {
        const { rows } = await db.query(
            `UPDATE orders
         SET status = $1
         WHERE id=$2
         RETURNING *;`,
            ['processing', orderId]
        )
        const result = resData('Update successfully', 0, rows[0]);
        return result;
    }
}

const adminServices = {
    addNewProductDetail,
    updateProduct,
    updateQuantityProductDetail,
    getInfoBuyTurnUser,
    getProductsByMonth,
    getTotalSalesByMonth,
    getBuyTurnByMonthOfProduct,
    getInfoProduct,
    getAllOrders,
    updateOrderAdmin,
}
export default adminServices;