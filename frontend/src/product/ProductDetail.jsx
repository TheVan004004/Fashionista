import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/main.context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { searchAPI, viewDetailProductAPI } from "../services/product.api";
import { addToCartAPI } from "../services/cart.api";
import Product from "./product";
import locationIcon from "../access/icon/location.svg";
import phoneIcon from "../access/icon/phone.svg";
import returnIcon from "../access/icon/return.svg";
import return60Icon from "../access/icon/return-60.svg";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { user, productDetail, setProductDetail } = useContext(MainContext);
  const [productDetailId, setProductDetailId] = useState("");
  const [image, setImage] = useState("");
  const [colorPicked, setColorPicked] = useState("");
  const [sizePicked, setSizePicked] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [listPopularSimilar, setListPopularSimilar] = useState([]);
  const [limitViewMore, setLimitViewMore] = useState(5);
  const [pageViewMore, setPageViewMore] = useState(1);
  const sizes = ["M", "L", "XL", "2XL"];
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setColorPicked("");
    setSizePicked("");
  }, [productDetail]);
  useEffect(() => {
    getProductSimilar();
  }, [limitViewMore, productDetail]);
  useEffect(() => {
    getProduct();
  }, [colorPicked, sizePicked, productDetail]);
  const getProductSimilar = async () => {
    try {
      const res = await searchAPI(
        "",
        "",
        "",
        "",
        "",
        "",
        productDetail.category_name,
        1,
        limitViewMore
      );
      const data = res.data.data;
      setListPopularSimilar(data.products);
      setPageViewMore(data.pageInfo.nextPage);
    } catch (e) {}
  };
  const getProduct = async () => {
    try {
      if (!productDetail.id) return;
      const res = await viewDetailProductAPI({
        product_id: productDetail.id,
        size: sizePicked,
        color: colorPicked.hex_code,
      });
      const data = res.data.data;
      setImage(data.image);
      setProductDetailId(data.id);
    } catch (e) {
      console.log(e);
    }
  };
  const addToCart = async () => {
    try {
      const res = await addToCartAPI({
        product_details_id: productDetailId,
        quantity: quantity,
        user_id: user.id,
      });
      console.log(res.data.errorCount);
      if (res.data.errorCount === 1) {
        toast.error("Sản phẩm đã hết hàng!");
        return;
      }
      toast.success("Thêm vào giỏ hàng thành công");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <>
      {productDetail && productDetail.id && (
        <div id="product">
          <div>
            <img className="picture" alt="" src={image} />
          </div>
          <div className="right-section">
            <div className="infor">
              <div className="name-clothe">{productDetail.name}</div>
              {/* <div className="describe">Thoáng khí</div> */}
              <div
                style={{
                  marginTop: "5px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                {productDetail.sale > 0 ? (
                  <>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "red",
                      }}
                    >
                      {(
                        (productDetail.price * (100 - productDetail.sale)) /
                        100
                      ).toLocaleString("vi-VN")}
                      đ
                    </div>
                    <del style={{ fontSize: "16px", color: "gray" }}>
                      {productDetail.price.toLocaleString("vi-VN")}đ
                    </del>
                    <div
                      style={{
                        backgroundColor: "#ffe0e0",
                        padding: "5px",
                        borderRadius: "1000px",
                        fontSize: "16px",
                        color: "red",
                      }}
                    >
                      -{productDetail.sale}%
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: "14px" }}>
                    {productDetail.price.toLocaleString("vi-VN")}đ
                  </div>
                )}
              </div>

              {/* <div className="discount">
                <a>Mã giảm giá (Chưa có)</a>
                <box>Giảm 50k</box>
                <box>Giảm 100k</box>
              </div> */}

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  Màu sắc: {colorPicked.color_name}
                </div>
                <div className="color_options" style={{ gap: "20px" }}>
                  {productDetail.color &&
                    productDetail.color.map((color, index) => {
                      return (
                        <button
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "1000px",
                            backgroundColor: color.hex_code,
                            cursor: "pointer",
                            boxShadow:
                              colorPicked.hex_code === color.hex_code
                                ? "0 0 0 4px white, 0 0 0 5px  var(--text-color)"
                                : "none",
                          }}
                          onClick={() => setColorPicked(color)}
                        ></button>
                      );
                    })}
                </div>
              </div>

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    fontSize: "16px",
                  }}
                >
                  <div style={{ fontWeight: "600" }}>
                    Kích thước: {sizePicked}
                  </div>
                  <a> Hướng dẫn chọn kích thước</a>
                </div>

                <div className="size_options">
                  {sizes.map((size, index) => {
                    return (
                      <button
                        className={size === sizePicked && "active"}
                        key={size + index}
                        onClick={() => setSizePicked(size)}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="quantity">
                <div className="quantity_input">
                  <div
                    onClick={() => {
                      if (quantity > 1) setQuantity(quantity - 1);
                    }}
                  >
                    -
                  </div>
                  <p>{quantity}</p>
                  <div onClick={() => setQuantity(quantity + 1)}>+</div>
                </div>
                <button
                  className="submit btn10"
                  onClick={() => {
                    if (sizePicked !== "" && colorPicked !== "") addToCart();
                  }}
                >
                  {colorPicked === ""
                    ? "Chọn màu sắc"
                    : sizePicked === ""
                    ? "Chọn kích thước"
                    : "Thêm vào giỏ hàng"}
                </button>
              </div>
            </div>

            <div className="service" style={{ paddingTop: "10px" }}>
              <div className="product-policy">
                <div className="line">
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div className="img">
                      <img src={returnIcon} />
                    </div>
                    <div
                      className="passage"
                      style={{ fontWeight: "600", fontSize: "16px" }}
                    >
                      Đổi trả cực dễ chỉ cần
                      <br /> số điện thoại
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div className="img">
                      <img src={return60Icon} />
                    </div>
                    <div
                      className="passage"
                      style={{ fontWeight: "600", fontSize: "16px" }}
                    >
                      60 ngày đổi trả
                      <br />
                      vì bất cứ lí do gì
                    </div>
                  </div>
                </div>
                <div className="line">
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div className="img">
                      <img src={phoneIcon} />
                    </div>
                    <div
                      className="passage"
                      style={{ fontWeight: "600", fontSize: "16px" }}
                    >
                      Hotline 1900.27.27.37 hỗ
                      <br /> trợ từ 8h30 - 22h mỗi ngày
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div className="img">
                      <img src={locationIcon} alt="location-icon" />
                    </div>
                    <div
                      className="passage"
                      style={{ fontWeight: "600", fontSize: "16px" }}
                    >
                      Đến tận nơi nhận hàng trả,
                      <br />
                      hoàn tiền trong 24h
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="product-feature"
                style={{
                  paddingTop: "20px",
                  fontSize: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  className="prominent"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  Đặc điểm nổi bật
                </div>
                <div>- Chất liệu 100% Cotton mềm mại, chống nhăn</div>
                <div>- Form dáng: Regular</div>
                <div>
                  - Vải thoáng khí và thấm hút mồ hôi tốt, thân thiện với da
                </div>
                <div>- Người mẫu: 1m77 - 74kg; mặc áo size XL</div>
                <div>- Tự hào sản xuất tại Việt Nam</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          margin: "0px 7vw 30px 7vw",
        }}
      >
        <div id="similar">
          <div className="title">Sản phẩm tương tự </div>
          <div className="body">
            {listPopularSimilar.map((product, index) => {
              return (
                <Product
                  product={product}
                  key={"popular_" + product.id + index}
                />
              );
            })}
          </div>
          {pageViewMore && (
            <button
              className="view-more btn12"
              onClick={() => setLimitViewMore((prev) => prev + 8)}
            >
              Tìm kiếm thêm
            </button>
          )}
        </div>
      </div>

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
  );
};

export default ProductDetail;
