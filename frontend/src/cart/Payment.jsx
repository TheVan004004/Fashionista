import React from "react";
import empty from "../access/empty.png";
export default function Payment({ listOrder, setListOrder }) {
  return (
    <div className="payment">
      <h2>Chi Tiết Đơn hàng</h2>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá (VNĐ)</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody></tbody>
        {listOrder.map((product, index) => {
          return (
            <tr>
              <td>{product.name}</td>
              <td>
                {(product.price * (1 - product.sale) * 1000).toLocaleString(
                  "vi-VN"
                )}
                đ
              </td>
              <td>count</td>
            </tr>
          );
        })}
        {listOrder.length !== 0 && (
          <tr>
            <td colspan="3" style={{ textAlign: "right" }}>
              Sum: $180
            </td>
          </tr>
        )}
      </table>
      {listOrder.length === 0 && (
        <div style={{ width: "70%", alignSelf: "center" }}>
          <img style={{ width: "100%" }} src={empty}></img>
          <p
            style={{ fontSize: "16px", fontWeight: "600", textAlign: "center" }}
          >
            Vui lòng chọn các sản phẩm trong giỏ hàng trước khi thanh toán
          </p>
        </div>
      )}
      <div className="order">Mua hàng</div>
    </div>
  );
}
