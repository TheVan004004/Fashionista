import { useContext, useState } from "react";
import { MainContext } from "../context/main.context";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";

const Product = (props) => {
    const { product, type } = props
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
                className={type && type === "mini" ? "mini_img container_img" : "container_img"}
            >
                <img
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    src={product.image} alt="" />
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
                        <HiOutlineShoppingCart style={{
                            fontSize: "36px",
                        }} />
                        {
                            type && type === "mini"
                                ?
                                <></>
                                :
                                <p> Thêm vào giỏ hàng </p>
                        }
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
                        flexDirection: type === "mini" ? "column" : "row",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                    {product.sale > 0
                        ?
                        <>
                            <div style={{ fontSize: "16px", fontWeight: "600", color: 'var(--sale-color)' }} >
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
            {
                type && type === "mini"
                    ?
                    <></>
                    :
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
            }

        </div >
    )
}

export default Product;