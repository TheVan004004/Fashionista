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
  return (
    <div id="add-product">
      <div className="left">
        <a className="" style={{ border: "none" }}>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={product.image}
          />
        </a>
        <button className="btn10">Thay đổi ảnh</button>
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
              height: "320px",
              backgroundColor: "var(--blur-color)",
            }}
          >
            <ChartProductBuyTurn data={dataChart} />
          </div>
          <div className="container-input-quantity">
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Tồn kho:
              </div>
              <input type="number" value={1} style={{ width: "100%" }}></input>
            </div>
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Nhập thêm sản phẩm:
              </div>
              <input type="number" value={1} style={{ width: "100%" }}></input>
            </div>
          </div>
        </div>
        <div className="container-input-add-product">
          <button className="btn12">Thêm màu mới</button>
          <button className="btn10">Nhập thêm sản phẩm</button>
        </div>
      </div>
    </div>
  );
}
