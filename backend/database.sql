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

----

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
