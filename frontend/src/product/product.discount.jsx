import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/main.context";
import { HiOutlineShoppingCart } from "react-icons/hi";
const ProductDiscount = ({ product }) => {
  const { productDetail, setProductDetail } = useContext(MainContext);
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const handleViewDetail = () => {
    setProductDetail(product);
    navigate("/product");
  };
  return (
    <div
      className="product"
      onClick={() => handleViewDetail()}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="container_img">
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: isHover ? "120%" : "100%",
          }}
          src={product.image}
          alt=""
        />
        {isHover && (
          <div className="hover_product">
            <HiOutlineShoppingCart style={{ fontSize: "36px" }} />
            <p> Thêm vào giỏ hàng </p>
          </div>
        )}
      </div>
      <div className="text">
        <p style={{ fontSize: "16px", fontWeight: "600", color: "red" }}>
          {((product.price * (100 - product.sale)) / 100).toLocaleString(
            "vi-VN"
          )}
          đ
        </p>
        <del style={{ fontSize: "12px", fontWeight: "600", color: "gray" }}>
          {product.price.toLocaleString("vi-VN")}đ
        </del>
      </div>
      <div className="sale">-{product.sale}%</div>
    </div>
  );
};

export default ProductDiscount;
