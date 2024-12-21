import React from "react";
import "./style.css";
export default function AddProduct() {
  return (
    <div id="add-product">
      <div className="left">
        <a className=""></a>
        <button className="btn10">Tải lên ảnh</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="right">
          <div className="container-input">
            <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
              Tên sản phẩm:
            </div>
            <input
              placeholder="Nhập tên sản phẩm"
              style={{ width: "100%" }}
            ></input>
          </div>
          <div className="container-input-price">
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Giá bán:
              </div>
              <input
                placeholder="Nhập tên sản phẩm"
                style={{ width: "100%" }}
              ></input>
            </div>
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Giảm giá
              </div>
              <select value={10}>
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
          </div>
          <div className="container-input-category">
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Loại sản phẩm:
              </div>
              <select value={10}>
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
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>Màu:</div>
              <select value={10}>
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
          </div>
        </div>
        <button className="btn10">Thêm sản phẩm</button>
      </div>
    </div>
  );
}
