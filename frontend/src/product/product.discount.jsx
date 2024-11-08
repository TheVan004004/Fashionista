const ProductDiscount = () => {
    // const { productDetail, setProductDetail } = useContext(MainContext)
    // const navigate = useNavigate()
    // const handleViewDetail = () => {
    //     console.log(product)
    //     setProductDetail(product)
    //     navigate('/product')
    // }
    return (
        <div className="product">
            <div style={{ width: "100%" }}>
                <img src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-khoac-tre-em-3c-pro-yody-akk6006-vag-7.jpg" alt="" />
            </div>
            <div className="text">
                <p style={{ fontSize: "16px", fontWeight: "600", color: "red" }}>679.200đ</p>
                <del style={{ fontSize: "12px", fontWeight: "600", color: "gray" }}>849.000đ</del>
            </div>
            <div className="sale">
                -20%
            </div>
        </div>
    )
}

export default ProductDiscount;