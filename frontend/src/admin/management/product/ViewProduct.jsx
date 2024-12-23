import React, { useEffect, useState } from "react";
import "./style.css";
import ChartProductBuyTurn from "./ChartProductBuyTurn";
export default function ViewProduct({ product }) {
  useEffect(() => {
    getChartBuyturn();
    return () => {
      setDataChart([]);
    };
  }, [product]);
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
              <input type="number" value={1} style={{ width: "100%" }}></input>
            </div>
            <button className="btn10">Nhập</button>
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
              <input type="number" value={1} style={{ width: "100%" }}></input>
            </div>
            <button className="btn10">Nhập</button>
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
              <input type="number" value={1} style={{ width: "100%" }}></input>
            </div>
            <button className="btn10">Nhập</button>
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
              <input type="number" value={1} style={{ width: "100%" }}></input>
            </div>
            <button className="btn10">Nhập</button>
          </div>
        </div>
      </div>
    </div>
  );
}
