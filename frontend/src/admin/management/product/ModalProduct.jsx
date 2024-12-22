import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { HiChevronLeft, HiChevronRight, HiOutlineX } from "react-icons/hi";
import ViewProduct from "./ViewProduct";
import { viewDetailProductAPI } from "../../../services/product.api";

export default function ModalProduct({
  isOpenModalProduct,
  setIsOpenModalProduct,
  productView,
}) {
  useEffect(() => {
    getAllProductDetail();
  }, [productView]);
  const getAllProductDetail = async () => {
    let listProductDetailCurr = [];
    if (productView.length === 0) {
      setListProductDetail(["add"]);
      return;
    }
    try {
      const promises = productView?.color?.map((color) =>
        viewDetailProductAPI({
          product_id: productView.id,
          color: color.hex_code,
          size: "L",
        })
      );
      const results = await Promise.all(promises);
      listProductDetailCurr = results.map((res) => res.data.data);
      listProductDetailCurr = [...listProductDetailCurr, "add"];
      console.log(listProductDetailCurr);
      // Cập nhật state
      setListProductDetail(listProductDetailCurr);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listProductDetail, setListProductDetail] = useState([]);
  const toNext = () => {
    setCurrentIndex((index) => {
      if (index === listProductDetail.length - 1) return 0;
      else return index + 1;
    });
  };
  const toPrev = () => {
    setCurrentIndex((index) => {
      if (index === 0) return listProductDetail.length - 1;
      else return index - 1;
    });
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          backgroundColor: isOpenModalProduct ? "#00000096" : "transparent",
          zIndex: isOpenModalProduct ? "100" : "-1",
          fontSize: "14px",
          transition: "ease-in-out 500ms",
        }}
        // onClick={() => setIsOpenModalProduct(false)}
      >
        <HiOutlineX
          className="btn12"
          style={{
            position: "fixed",
            right: "10px",
            top: "10px",
            width: "30px",
            height: "30px",
            backgroundColor: "var(--sale-color)",
            zIndex: isOpenModalProduct ? "100" : "-1",
            color: "white",
            fontSize: "14px",
            transition: "ease-in-out 500ms",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
          onClick={() => {
            setIsOpenModalProduct(false);
            setCurrentIndex(0);
            setListProductDetail([]);
          }}
        />
        <div
          className={
            isOpenModalProduct
              ? "modal-product-container active"
              : "modal-product-container"
          }
        >
          {/* <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ display: "flex", gap: "10x", alignItems: "center" }}>
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Tên sản phẩm:
              </div>
              <input style={{ width: "300px" }} value={productView.name} />
            </div>
            <div style={{ display: "flex", gap: "10x", alignItems: "center" }}>
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Giá:
              </div>
              <input style={{ width: "100px" }} value={productView.price} />
            </div>
            <div style={{ display: "flex", gap: "10x", alignItems: "center" }}>
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Giảm giá:
              </div>
              <select value={productView.sale}>
                <option value={10}>10%</option>
                <option value={20}>20%</option>
                <option value={30}>30%</option>
                <option value={40}>40%</option>
                <option value={50}>50%</option>
                <option value={60}>60%</option>
                <option value={70}>70%</option>
                <option value={80}>80%</option>
                <option value={90}>90%</option>
              </select>
            </div>
            <button className="btn10">Lưu thay đổi</button>
          </div> */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {listProductDetail.length > 1 && (
              <>
                <HiChevronLeft onClick={toPrev} style={{ fontSize: "24px" }} />

                <div className="list-color">
                  {listProductDetail.map((product, index) => {
                    if (index === listProductDetail.length - 1)
                      return (
                        <button
                          style={{
                            backgroundColor: "transparent !important",
                            boxShadow: "none",
                            border: "2px dashed black",
                            // colorPicked.hex_code === color.hex_code
                            //   ? "0 0 0 4px white, 0 0 0 5px  var(--text-color)"
                            //   : "none",
                          }}
                          // onClick={() => setColorPicked(color)}
                        ></button>
                      );
                    return (
                      <button
                        style={{
                          backgroundColor: product.hex_code,
                          boxShadow: "none",
                          // colorPicked.hex_code === color.hex_code
                          //   ? "0 0 0 4px white, 0 0 0 5px  var(--text-color)"
                          //   : "none",
                        }}
                        // onClick={() => setColorPicked(color)}
                      ></button>
                    );
                  })}
                </div>
                <HiChevronRight onClick={toNext} style={{ fontSize: "24px" }} />
              </>
            )}
          </div>
          <div id="container_slide_product">
            <div
              id="slide_product"
              style={{
                translate: `-${100 * currentIndex}%`,
              }}
            >
              {listProductDetail.map((product, index) => {
                return (
                  <div className="container-card" key={`banner_${index}`}>
                    {index === listProductDetail.length - 1 ? (
                      <AddProduct />
                    ) : (
                      <ViewProduct product={product} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
