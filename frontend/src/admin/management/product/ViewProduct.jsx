import React, { useEffect, useState } from "react";
import "./style.css";
import ChartProductBuyTurn from "./ChartProductBuyTurn";
import { updateQuantityProductDetailAPI } from "../../../services/admin.api";
import { viewDetailProductAPI } from "../../../services/product.api";
export default function ViewProduct({
  product,
  color,
  productView,
  setProductView,
}) {
  const [quantityM, setQuantityM] = useState(0);
  const [quantityL, setQuantityL] = useState(0);
  const [quantityXL, setQuantityXL] = useState(0);
  const [quantity2XL, setQuantity2XL] = useState(0);
  useEffect(() => {
    getChartBuyturn();
    return () => {
      setDataChart([]);
    };
  }, [product]);
  const updateQuantitySize = async (size, quantity) => {
    const id = await getProductDetail(size);
    await updateQuantityProductDetailAPI(id, quantity);
    setProductView((prev) => ({ ...prev, update: true }));
  };
  const getProductDetail = async (size) => {
    const res = await viewDetailProductAPI({
      product_id: productView.id,
      size: size,
      color: color,
    });
    return res.data.data.id;
  };
  const [dataChart, setDataChart] = useState([]);
  const getChartBuyturn = async () => {
    const data = product.productInfoByColor.map((d) => ({
      x: d.month,
      y: parseInt(d.total_buyturn),
    }));
    setDataChart(data);
  };

  return (
    <div id="add-product">
      <div className="left">
        <img
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
          }}
          src={product.image}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="right">
          <div
            style={{
              width: "100%",
              flexGrow: "1",
              height: "305px",
              border: "2px solid var(--blur-color)",
              backgroundColor: "var(--blur-color)",
            }}
          >
            <ChartProductBuyTurn data={dataChart} />
          </div>
          <div className="container-input-quantity">
            <div style={{ fontSize: "18px", fontWeight: "600" }}>Size M </div>
            <div
              style={{
                flexShrink: "0",
                whiteSpace: "nowrap",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Tồn kho: {product.quantity_sizeM}
            </div>
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Nhập thêm :
              </div>
              <input
                type="number"
                value={quantityM}
                onChange={(e) => setQuantityM(e.target.value)}
                style={{ width: "100%" }}
              ></input>
            </div>
            <button
              className="btn10"
              onClick={() =>
                updateQuantitySize(
                  "M",
                  parseInt(quantityM) + parseInt(product.quantity_sizeM)
                )
              }
            >
              Nhập
            </button>
          </div>
          <div className="container-input-quantity">
            <div style={{ fontSize: "18px", fontWeight: "600" }}>Size L</div>
            <div
              style={{
                flexShrink: "0",
                whiteSpace: "nowrap",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Tồn kho: {product.quantity_sizeL}
            </div>
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Nhập thêm :
              </div>
              <input
                type="number"
                value={quantityL}
                onChange={(e) => setQuantityL(e.target.value)}
                style={{ width: "100%" }}
              ></input>
            </div>
            <button
              className="btn10"
              onClick={() =>
                updateQuantitySize(
                  "L",
                  parseInt(quantityL) + parseInt(product.quantity_sizeL)
                )
              }
            >
              Nhập
            </button>
          </div>
          <div className="container-input-quantity">
            <div style={{ fontSize: "18px", fontWeight: "600" }}>Size XL</div>
            <div
              style={{
                flexShrink: "0",
                whiteSpace: "nowrap",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Tồn kho: {product.quantity_sizeXL}
            </div>
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Nhập thêm :
              </div>
              <input
                type="number"
                value={quantityXL}
                onChange={(e) => setQuantityXL(e.target.value)}
                style={{ width: "100%" }}
              ></input>
            </div>
            <button
              className="btn10"
              onClick={() =>
                updateQuantitySize(
                  "XL",
                  parseInt(quantityXL) + parseInt(product.quantity_sizeXL)
                )
              }
            >
              Nhập
            </button>
          </div>
          <div className="container-input-quantity">
            <div style={{ fontSize: "18px", fontWeight: "600" }}>Size 2XL</div>
            <div
              style={{
                flexShrink: "0",
                whiteSpace: "nowrap",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Tồn kho: {product.quantity_size2XL}
            </div>
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Nhập thêm :
              </div>
              <input
                type="number"
                value={quantity2XL}
                onChange={(e) => setQuantity2XL(e.target.value)}
                style={{ width: "100%" }}
              ></input>
            </div>
            <button
              className="btn10"
              onClick={() =>
                updateQuantitySize(
                  "2XL",
                  parseInt(quantity2XL) + parseInt(product.quantity_size2XL)
                )
              }
            >
              Nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
