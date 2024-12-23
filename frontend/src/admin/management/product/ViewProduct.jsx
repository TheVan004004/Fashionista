import React, { useEffect, useState } from "react";
import "./style.css";
import { getChartBuyturnProductAPI } from "../../../services/admin.api";
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
    const res = await getChartBuyturnProductAPI(product.id);
    const data = res.data.data.map(
      (d) => d.total_buyturn + Math.floor(Math.random() * 10001)
    );
    setDataChart(data);
  };
  const sizes = ["L", "M", "XL"];
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
          {sizes.map((size, index) => {
            return (
              <div className="container-input-quantity">
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  Size {size}:
                </div>
                <div className="container-input">
                  <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                    Tồn kho:
                  </div>
                  <input
                    type="number"
                    value={1}
                    style={{ width: "100%" }}
                  ></input>
                </div>
                <div className="container-input">
                  <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                    Nhập thêm :
                  </div>
                  <input
                    type="number"
                    value={1}
                    style={{ width: "100%" }}
                  ></input>
                </div>
                <button className="btn10">Nhập</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
