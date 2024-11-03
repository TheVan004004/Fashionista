import { useContext, useEffect, useRef } from 'react';
import './product.css'
import { MainContext } from '../context/main.context';
const ProductDetail = () => {
    const { productDetail, setProductDetail } = useContext(MainContext)
    const ref = useRef(null)
    useEffect(() => {
        console.log(productDetail)
        window.scrollTo({ top: 0 })
    }, [])
    return (
        <>
            <div id="product" >
                <div>
                    <img class="picture" src="clothes/model1.webp" />
                </div>
                <div class="right-section">
                    <div class="infor">
                        <div class="name-clothe">
                            {productDetail.name}
                        </div>
                        <div class="describe">
                            Thoáng khí
                        </div>
                        <div class="original-price">
                            599.000đ
                        </div>
                        <div class="price">
                            <a>599.000đ</a>
                            <button>-10%</button>
                        </div>
                        <div class="discount" >
                            <a>Mã giảm giá</a>
                            <box >Giảm 50k</box>
                            <box>Giảm 100k</box>
                        </div>
                        <div class="color">
                            <a class="text">Màu sắc:</a>
                            <a class="specific">Trắng</a>
                        </div>
                        <div class="img-color">
                            <button></button>
                        </div>
                        <div class="size">
                            <div>Kích thước</div>
                            <div>Hướng dẫn chọn size</div>
                        </div>
                        <div class="specific-size">
                            <button>
                                S
                            </button>
                            <button>
                                M
                            </button>
                            <button>
                                L
                            </button>
                            <button>
                                XL
                            </button>
                            <button>
                                2XL
                            </button>
                        </div>
                        <div class="quantity" >
                            <div class="button1">
                                <button>1</button>
                            </div>
                            <div class="button2">
                                <button>Chọn kích thước</button>
                            </div>
                        </div>
                    </div>

                    <div class="service">
                        <div class="product-policy">
                            <div class="line">
                                <div>
                                    <div class="img">
                                        <img src="icon/return.svg" />
                                    </div>
                                    <div class="passage">
                                        Đổi trả cực dễ chỉ cần số
                                        <br /> điện thoại
                                    </div>
                                </div>
                                <div>
                                    <div class="img">
                                        <img src="icon/return-60.svg" />
                                    </div>
                                    <div class="passage">
                                        60 ngày đổi tra vì bất cứ lí do gì
                                    </div>
                                </div>
                            </div>
                            <div class="line">
                                <div>
                                    <div class="img">
                                        <img src="icon/phone.svg" />
                                    </div>
                                    <div class="passage">
                                        Hotline 1900.27.27.37 hỗ
                                        <br /> trợ từ 8h30 - 22h mỗi ngày
                                    </div>
                                </div>
                                <div>
                                    <div class="img">
                                        <img src="icon/location.svg" />
                                    </div>
                                    <div class="passage">
                                        Đến tận nơi nhận hàng trả,
                                        <br />
                                        hoàn tiền trong 24h
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="product-feature" >
                            <div class="prominent">Đặc điểm nổi bật</div>
                            <div>*  Chất  liệu 100% Cotton mềm mại, chống nhăn</div>
                            <div>*  Form dáng: Regular</div>
                            <div>*  Vải thoáng khí và thấm hút mồ hôi tốt, thân thiện với da</div>
                            <div>*  Người mẫu: 1m77 - 74kg; mặc áo size XL</div>
                            <div>*  Tự hào sản xuất tại Việt Nam</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div id="similar">
                <div class="title" >
                    <div class="line">
                        <hr class="line-infor" />
                    </div>
                    <div class="text">
                        Sản phẩm tương tự
                    </div>
                    <div class="line">
                        <hr class="line-infor" />
                    </div>
                </div>

                <div class="product">
                    <div class="img-object">
                        <div class="image">
                            <img src="clothes/item1.webp" />
                        </div>
                        <div id="text-object">
                            <div class="name-product">
                                Áo Thu Đông Nữ Giữ Nhiệt Cổ 3cm
                            </div>
                            <div class="price">
                                849.000đ
                            </div>
                        </div>
                    </div>
                    <div class="img-object">
                        <div class="image">
                            <img src="clothes/item2.webp" />
                        </div>
                        <div id="text-object">
                            <div class="name-product">
                                Áo Thu Đông Nữ Giữ Nhiệt Cổ Tròn
                            </div>
                            <div class="price">
                                849.000đ
                            </div>
                        </div>
                    </div>
                    <div class="img-object">
                        <div class="image">
                            <img src="clothes/item3.webp" />
                        </div>
                        <div id="text-object">
                            <div class="name-product">
                                Áo Thu Đông Nữ Giữ Nhiệt Cổ Tròn
                            </div>
                            <div class="price">
                                849.000đ
                            </div>
                        </div>
                    </div>
                    <div class="last-img-object">
                        <div class="image">
                            <img src="clothes/item4.webp" />
                        </div>
                        <div id="text-object">
                            <div class="name-product">
                                Áo Thu Đông Nữ Giữ Nhiệt Cổ Tròn
                            </div>
                            <div class="price">
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