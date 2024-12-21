import React from "react";
import "./style.css";
export default function ViewProduct() {
  return (
    <div id="add-product">
      <div className="left">
        <a className=""></a>
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
            Chart mua sản phẩm
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
