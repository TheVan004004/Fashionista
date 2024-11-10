import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/main.context';
const ProductDetail = () => {
    const { productDetail, setProductDetail } = useContext(MainContext)
    const [colorPicked, setColorPicked] = useState(productDetail.color[0].name)
    const [sizePicked, setSizePicked] = useState("")
    const [quantity, setQuantity] = useState(1)
    const sizes = ["M", "L", "XL", "XXL"]
    useEffect(() => {
        console.log(productDetail)
        window.scrollTo({ top: 0 })
    }, [])
    return (
        <>
            <div id="product" >
                <div>
                    <img className="picture"
                        alt=""
                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-yody-TSN7274-REU,%20CVN7058-NAU%20(4).jpg" />
                </div>
                <div className="right-section">
                    <div className="infor">
                        <div className="name-clothe">
                            {productDetail.name}
                        </div>
                        <div className="describe">
                            Thoáng khí
                        </div>
                        <div style={{
                            marginTop: "5px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "15px"
                        }}>
                            {productDetail.sale > 0
                                ?
                                <>
                                    <div style={{ fontSize: "24px", fontWeight: "600", color: "red" }} >
                                        {(productDetail.price * (1 - productDetail.sale) * 1000).toLocaleString("vi-VN")}đ
                                    </div>
                                    <del
                                        style={{ fontSize: "16px", color: "gray" }}
                                    >{(productDetail.price * 1000).toLocaleString("vi-VN")}đ</del>
                                    <div style={{
                                        backgroundColor: "#ffe0e0",
                                        padding: "5px",
                                        borderRadius: "1000px",
                                        fontSize: "16px", color: "red"
                                    }}>
                                        -{productDetail.sale * 100}%
                                    </div>
                                </>
                                :
                                <div style={{ fontSize: "14px" }} >
                                    {(productDetail.price * 1000).toLocaleString("vi-VN")}đ
                                </div>
                            }
                        </div>

                        <div className="discount" >
                            <a>Mã giảm giá (Chưa có)</a>
                            <box >Giảm 50k</box>
                            <box>Giảm 100k</box>
                        </div>

                        <div
                            style={{
                                marginTop: "15px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px"
                            }}
                        >

                            <div style={{ fontSize: "16px", fontWeight: "600" }}>Màu sắc: {colorPicked}</div>
                            <div className="color_options"
                                style={{ gap: "20px" }}
                            >
                                {
                                    productDetail.color &&
                                    productDetail.color.map((color, index) => {
                                        return (
                                            <div style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "1000px",
                                                backgroundColor: color.hex_code,
                                                cursor: "pointer",
                                                boxShadow: colorPicked === color.name ? "0 0 0 4px white, 0 0 0 5px  var(--text-color)" : "none",
                                            }}
                                                onClick={() => setColorPicked(color.name)}
                                            ></div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: "15px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignContent: "center",
                                    fontSize: "16px",
                                }}>
                                <div style={{ fontWeight: "600" }}>Kích thước: {sizePicked}</div>
                                <a> Hướng dẫn chọn kích thước</a>
                            </div>

                            <div className="size_options">
                                {
                                    sizes.map((size, index) => {
                                        return (
                                            <div
                                                className={size === sizePicked && "active"}
                                                key={size + index}
                                                onClick={() => setSizePicked(size)}
                                            >
                                                {size}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="quantity" >
                            <div className="quantity_input">
                                <div
                                    onClick={() => {
                                        if (quantity > 0) setQuantity(quantity - 1)
                                    }}
                                >-</div>
                                <p>{quantity}</p>
                                <div
                                    onClick={() => setQuantity(quantity + 1)}
                                >+</div>
                            </div>
                            <div className="submit">
                                {sizePicked === "" ? "Chọn kích thước" : "Thêm vào giỏ hàng"}
                            </div>
                        </div>
                    </div>

                    <div className="service">
                        <div className="product-policy">
                            <div className="line">
                                <div>
                                    <div className="img">
                                        <img src="icon/return.svg" />
                                    </div>
                                    <div className="passage">
                                        Đổi trả cực dễ chỉ cần số
                                        <br /> điện thoại
                                    </div>
                                </div>
                                <div>
                                    <div className="img">
                                        <img src="icon/return-60.svg" />
                                    </div>
                                    <div className="passage">
                                        60 ngày đổi tra vì bất cứ lí do gì
                                    </div>
                                </div>
                            </div>
                            <div className="line">
                                <div>
                                    <div className="img">
                                        <img src="icon/phone.svg" />
                                    </div>
                                    <div className="passage">
                                        Hotline 1900.27.27.37 hỗ
                                        <br /> trợ từ 8h30 - 22h mỗi ngày
                                    </div>
                                </div>
                                <div>
                                    <div className="img">
                                        <img src="icon/location.svg" />
                                    </div>
                                    <div className="passage">
                                        Đến tận nơi nhận hàng trả,
                                        <br />
                                        hoàn tiền trong 24h
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="product-feature" >
                            <div className="prominent">Đặc điểm nổi bật</div>
                            <div>*  Chất  liệu 100% Cotton mềm mại, chống nhăn</div>
                            <div>*  Form dáng: Regular</div>
                            <div>*  Vải thoáng khí và thấm hút mồ hôi tốt, thân thiện với da</div>
                            <div>*  Người mẫu: 1m77 - 74kg; mặc áo size XL</div>
                            <div>*  Tự hào sản xuất tại Việt Nam</div>
                        </div>
                    </div>
                </div>
            </div >

            {/* <div id="similar">
                <div className="title" >
                    <div className="line">
                        <hr className="line-infor" />
                    </div>
                    <div className="text">
                        Sản phẩm tương tự
                    </div>
                    <div className="line">
                        <hr className="line-infor" />
                    </div>
                </div>

                <div className="product">
                    <div className="img-object">
                        <div className="image">
                            <img src="clothes/item1.webp" />
                        </div>
                        <div id="text-object">
                            <div className="name-product">
                                Áo Thu Đông Nữ Giữ Nhiệt Cổ 3cm
                            </div>
                            <div className="price">
                                849.000đ
                            </div>
                        </div>
                    </div>
                    <div className="img-object">
                        <div className="image">
                            <img src="clothes/item2.webp" />
                        </div>
                        <div id="text-object">
                            <div className="name-product">
                                Áo Thu Đông Nữ Giữ Nhiệt Cổ Tròn
                            </div>
                            <div className="price">
                                849.000đ
                            </div>
                        </div>
                    </div>
                    <div className="img-object">
                        <div className="image">
                            <img src="clothes/item3.webp" />
                        </div>
                        <div id="text-object">
                            <div className="name-product">
                                Áo Thu Đông Nữ Giữ Nhiệt Cổ Tròn
                            </div>
                            <div className="price">
                                849.000đ
                            </div>
                        </div>
                    </div>
                    <div className="last-img-object">
                        <div className="image">
                            <img src="clothes/item4.webp" />
                        </div>
                        <div id="text-object">
                            <div className="name-product">
                                Áo Thu Đông Nữ Giữ Nhiệt Cổ Tròn
                            </div>
                            <div className="price">
                                849.000đ
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default ProductDetail;