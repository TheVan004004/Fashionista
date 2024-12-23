import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import {
  HiArrowCircleLeft,
  HiArrowCircleRight,
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePlusCircle,
  HiOutlineX,
} from "react-icons/hi";
import ViewProduct from "./ViewProduct";
import {
  getInfoProductAdminAPI,
  updateProductAPI,
} from "../../../services/admin.api";

export default function ModalProduct({
  isOpenModalProduct,
  setIsOpenModalProduct,
  productView,
  getProduct,
  setProductView,
  getColor,
}) {
  useEffect(() => {
    getAllProductDetail();
    setNameChange(productView.name);
    setPriceChange(productView.price);
    setSaleChange(productView.sale);
  }, [productView]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [listProductDetail, setListProductDetail] = useState([]);
  const [nameChange, setNameChange] = useState(productView.name);
  const [priceChange, setPriceChange] = useState(productView.price);
  const [saleChange, setSaleChange] = useState(productView.price);
  const [isEdit, setIsEdit] = useState(false);
  const [listColor, setListColor] = useState([]);
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
  const getAllProductDetail = async () => {
    if (productView.length === 0) {
      setListProductDetail(["add"]);
      return;
    }
    try {
      const res = await getInfoProductAdminAPI(productView.id);
      const data = res.data.data;
      setListColor([...data.color, "add"]);
      setListProductDetail([...data.listProductsInfoByColor, "add"]);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };
  const handleChange = async () => {
    if (isEdit) {
      await updateProductAPI({
        product_id: productView.id,
        newName: nameChange,
        newPrice: priceChange,
        newSale: saleChange,
      });
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
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
            opacity: isOpenModalProduct ? "1" : "0",
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
            getProduct();
          }}
        />
        <div
          className={
            isOpenModalProduct
              ? "modal-product-container active"
              : "modal-product-container"
          }
        >
          <div
            style={{
              padding: "0px 15px",
              display: "grid",
              gridTemplateColumns: "1.7fr 1fr 1fr 0.5fr",
              alignItems: "center",
              gap: "15px",
              height: listProductDetail.length === 1 ? "0" : "60px",
              overflow: "hidden",
              backgroundColor: "var(--accent-color)",
              transition: "all 500ms",
              color: "white",
              fontWeight: "600",
            }}
          >
            <input
              style={{ fontSize: "20px", color: "white", fontWeight: "600" }}
              value={nameChange}
              onChange={(e) => setNameChange(e.target.value)}
              disabled={!isEdit}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Giá bán:
              </div>
              <input
                style={{
                  fontSize: "20px",
                  color: "white",
                  fontWeight: "600",
                }}
                value={priceChange}
                onChange={(e) => setPriceChange(e.target.value)}
                disabled={!isEdit}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Giảm giá:
              </div>
              <select
                disabled={!isEdit}
                value={saleChange}
                onChange={(e) => setSaleChange(e.target.value)}
                style={{
                  width: "70px",
                  fontSize: "20px",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                <option value={0}>Không</option>
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
            <button
              className=""
              style={{ height: "40px" }}
              onClick={handleChange}
            >
              {isEdit ? "Lưu" : "Thay đổi"}
            </button>
          </div>
          <div
            style={{
              padding: "0px 30px 30px 30px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {listProductDetail.length > 1 && (
                <>
                  <HiChevronLeft
                    onClick={toPrev}
                    style={{ fontSize: "30px", cursor: "pointer" }}
                  />

                  <div className="list-color">
                    {listColor.map((color, index) => {
                      if (index === listColor.length - 1)
                        return (
                          <HiOutlinePlusCircle
                            style={{
                              boxShadow: "none",
                              fontSize: "25px",
                              scale: index === currentIndex ? "130%" : "100%",
                              transition: "all 1s ease-in-out",
                            }}
                            onClick={() => setCurrentIndex(index)}
                          />
                        );
                      return (
                        <button
                          style={{
                            backgroundColor: color.hex_code,
                            boxShadow:
                              index === currentIndex
                                ? "0 0 0 4px white, 0 0 0 5px  var(--text-color)"
                                : "none",
                          }}
                          onClick={() => setCurrentIndex(index)}
                        ></button>
                      );
                    })}
                  </div>
                  <HiChevronRight
                    onClick={toNext}
                    style={{ fontSize: "30px", cursor: "pointer" }}
                  />
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
                        <AddProduct
                          listProductDetail={listProductDetail}
                          getProduct={getProduct}
                          productView={productView}
                          setProductView={setProductView}
                        />
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
      </div>
    </>
  );
}
