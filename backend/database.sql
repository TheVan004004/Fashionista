-- Copy and paste this into PostgreSQL to Create table--
CREATE TABLE "products" (
  "id" serial PRIMARY KEY,
  "name" text,
  "image" text,
  size varchar(4),
  color text,
  "buyturn" int,
  "quantity" int,
  "brand_id" int,
  "category_id" int,
  "price (1000d)" int,
  sale float
);

