import { useContext } from "react";
import { MainContext } from "../context/main.context";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
    const { product } = props
    const { productDetail, setProductDetail } = useContext(MainContext)
    const navigate = useNavigate()
    const handleViewDetail = () => {
        console.log(product)
        setProductDetail(product)
        navigate('/product')
    }
    return (
        <div className="product"
            onClick={() => handleViewDetail()}
        >
            <div style={{ width: "100%" }}>
                <img src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-yody-TSN7188-BEE%20(3).jpg" alt="" />
            </div>
            <div className='text'
            >
                <p style={{ fontSize: "16px", fontWeight: "600" }}>{product.name}</p>
                <p>Giá: 100.000đ <del style={{ fontSize: "14px", fontWeight: "600", color: "gray" }}>{product.price}.000đ</del></p>
            </div>
        </div>
    )
}

export default Product;