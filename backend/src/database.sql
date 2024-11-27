-- Copy and paste this into PostgreSQL to Create table (from line 2 to line 88)--
CREATE TABLE "categories" (
  "id" serial PRIMARY KEY,
  "name" text,
  "image" text
);

CREATE TABLE "products" (
  "id" serial PRIMARY KEY,
  "name" text,
  "image" text,
  "brand_id" int,
  "category_id" int
);

CREATE TABLE "brands" (
  "id" serial PRIMARY KEY,
  "name" text,
  "image" text
);

CREATE TABLE "size" (
  "id" serial PRIMARY KEY,
  "name" varchar(5)
);

CREATE TABLE "color" (
  "id" serial PRIMARY KEY,
  "name" text,
  "hex_code" char(7)
);

CREATE TABLE "product_details" (
  "id" serial PRIMARY KEY,
  "product_id" int,
  "image" text,
  "size_id" int,
  "color_id" int,
  "buyturn" int,
  "quantity" int,
  "price" int,
  "sale" float
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" text,
  "password" text,
  "name" text,
  "role" int,
  "avatar" text,
  "phone" varchar(15),
  "address" text,
  "dob" date,
  "sex" int
);

CREATE TABLE "orders" (
  "id" serial PRIMARY KEY,
  "user_id" int,
  "status" int,
  "note" text,
  "total" int
);

CREATE TABLE "oder_details" (
  "id" serial PRIMARY KEY,
  "order_id" int,
  "product_id" int,
  "price" int,
  "quantity" int
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("brand_id") REFERENCES "brands" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("id") REFERENCES "users" ("id");

ALTER TABLE "product_details" ADD FOREIGN KEY ("size_id") REFERENCES "size" ("id");

ALTER TABLE "product_details" ADD FOREIGN KEY ("color_id") REFERENCES "color" ("id");

ALTER TABLE "oder_details" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "product_details" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "oder_details" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");


----
--sql_command[1]
--get product's id, name, image, price, sale, brand name, category name
SELECT products.id,products.name, products.image,price, sale, brands.name AS brand_name, categories.name AS category_name, SUM(buyturn) AS total_buyturn
FROM products
JOIN brands ON brands.id=products.brand_id
JOIN categories ON categories.id=products.category_id
JOIN product_details ON product_details.product_id=products.id
GROUP BY products.id,products.name, products.image,price, sale, brands.name, categories.name
HAVING SUM(buyturn)>0
ORDER BY products.id ASC


----
--sql_command[2]
SELECT DISTINCT ON (color_id) products.name,color.name as color_name,hex_code
FROM products
JOIN product_details ON product_details.product_id=products.id
JOIN color ON color.id=product_details.color_id
WHERE product_details.product_id= $1;

----
--sql_command[3]
SELECT color.hex_code
FROM products
JOIN product_details ON products.image=product_details.image
JOIN color ON color.id=product_details.color_id
WHERE products.id= $1
LIMIT 1;

----
--sql_command[4]
-- get all product_details in database
SELECT product_details.id,products.name, product_id, product_details.image, size.name as size_name, color.name as color_name, hex_code, price, sale, brands.name as brand_name, categories.name as category_name, buyturn, quantity
FROM product_details
JOIN products ON products.id=product_details.product_id
JOIN brands ON products.brand_id=brands.id
JOIN categories ON products.category_id=categories.id
JOIN color ON product_details.color_id=color.id
JOIN size ON product_details.size_id=size.id
WHERE product_id=$1 AND hex_code=$2 AND size.name=$3; 

----
-- Remove Vietnamese Tones
CREATE OR REPLACE FUNCTION remove_vietnamese_tones(input TEXT) RETURNS TEXT AS $$
BEGIN
    input := LOWER(input);
    
    input := REPLACE(input, 'à', 'a');
    input := REPLACE(input, 'á', 'a');
    input := REPLACE(input, 'ạ', 'a');
    input := REPLACE(input, 'ả', 'a');
    input := REPLACE(input, 'ã', 'a');
    input := REPLACE(input, 'â', 'a');
    input := REPLACE(input, 'ầ', 'a');
    input := REPLACE(input, 'ấ', 'a');
    input := REPLACE(input, 'ậ', 'a');
    input := REPLACE(input, 'ẩ', 'a');
    input := REPLACE(input, 'ẫ', 'a');
    input := REPLACE(input, 'ă', 'a');
    input := REPLACE(input, 'ằ', 'a');
    input := REPLACE(input, 'ắ', 'a');
    input := REPLACE(input, 'ặ', 'a');
    input := REPLACE(input, 'ẳ', 'a');
    input := REPLACE(input, 'ẵ', 'a');
    
    input := REPLACE(input, 'è', 'e');
    input := REPLACE(input, 'é', 'e');
    input := REPLACE(input, 'ẹ', 'e');
    input := REPLACE(input, 'ẻ', 'e');
    input := REPLACE(input, 'ẽ', 'e');
    input := REPLACE(input, 'ê', 'e');
    input := REPLACE(input, 'ề', 'e');
    input := REPLACE(input, 'ế', 'e');
    input := REPLACE(input, 'ệ', 'e');
    input := REPLACE(input, 'ể', 'e');
    input := REPLACE(input, 'ễ', 'e');
    
    input := REPLACE(input, 'ì', 'i');
    input := REPLACE(input, 'í', 'i');
    input := REPLACE(input, 'ị', 'i');
    input := REPLACE(input, 'ỉ', 'i');
    input := REPLACE(input, 'ĩ', 'i');
    
    input := REPLACE(input, 'ò', 'o');
    input := REPLACE(input, 'ó', 'o');
    input := REPLACE(input, 'ọ', 'o');
    input := REPLACE(input, 'ỏ', 'o');
    input := REPLACE(input, 'õ', 'o');
    input := REPLACE(input, 'ô', 'o');
    input := REPLACE(input, 'ồ', 'o');
    input := REPLACE(input, 'ố', 'o');
    input := REPLACE(input, 'ộ', 'o');
    input := REPLACE(input, 'ổ', 'o');
    input := REPLACE(input, 'ỗ', 'o');
    input := REPLACE(input, 'ơ', 'o');
    input := REPLACE(input, 'ờ', 'o');
    input := REPLACE(input, 'ớ', 'o');
    input := REPLACE(input, 'ợ', 'o');
    input := REPLACE(input, 'ở', 'o');
    input := REPLACE(input, 'ỡ', 'o');
    
    input := REPLACE(input, 'ù', 'u');
    input := REPLACE(input, 'ú', 'u');
    input := REPLACE(input, 'ụ', 'u');
    input := REPLACE(input, 'ủ', 'u');
    input := REPLACE(input, 'ũ', 'u');
    input := REPLACE(input, 'ư', 'u');
    input := REPLACE(input, 'ừ', 'u');
    input := REPLACE(input, 'ứ', 'u');
    input := REPLACE(input, 'ự', 'u');
    input := REPLACE(input, 'ử', 'u');
    input := REPLACE(input, 'ữ', 'u');
    
    input := REPLACE(input, 'ỳ', 'y');
    input := REPLACE(input, 'ý', 'y');
    input := REPLACE(input, 'ỵ', 'y');
    input := REPLACE(input, 'ỷ', 'y');
    input := REPLACE(input, 'ỹ', 'y');
    
    input := REPLACE(input, 'đ', 'd');

    RETURN input;
END;
$$ LANGUAGE plpgsql;
