import { useContext, useState } from "react";
import { MainContext } from "../context/main.context";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";

const Product = (props) => {
    const { product } = props
    const { productDetail, setProductDetail } = useContext(MainContext)
    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate()
    const handleViewDetail = () => {
        setProductDetail(product)
        navigate('/product')
    }
    return (
        <div className="product"
            style={{ gap: "10px" }}
            onClick={() => handleViewDetail()}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div
                className="container_img"
            >
                <img
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-TSN7301-DEN%20(10).JPG" alt="" />
                {product.sale > 0 &&
                    <div className="sale">
                        <div>sale: {product.sale * 100}%</div>
                    </div>
                }
                {
                    isHover &&
                    <div
                        className="hover_product"
                    >
                        <HiOutlineShoppingCart style={{ fontSize: "36px" }} />
                        <p> Đặt hàng ngay </p>
                    </div>
                }
            </div>
            <div className='text'
            >
                <div className="text_name">{product.name}</div>
                <div
                    className="text_price"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                    {product.sale > 0
                        ?
                        <>
                            <div style={{ fontSize: "16px", fontWeight: "600", color: "red" }} >
                                {(product.price * (1 - product.sale) * 1000).toLocaleString("vi-VN")}đ
                            </div>
                            <del
                                style={{ fontSize: "12px", fontWeight: "600", color: "gray" }}
                            >{(product.price * 1000).toLocaleString("vi-VN")}đ</del>
                        </>
                        :
                        <div style={{ fontSize: "14px" }} >
                            {(product.price * 1000).toLocaleString("vi-VN")}đ
                        </div>
                    }
                </div>
            </div>
            <div className="color_options">
                {
                    product.color &&
                    product.color.map((color, index) => {
                        return (
                            <div style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "1000px",
                                backgroundColor: color.hex_code
                            }}></div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default Product;