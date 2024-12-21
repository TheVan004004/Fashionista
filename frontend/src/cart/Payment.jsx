import React, { useEffect, useState } from "react";
import empty from "../access/empty.png";
import { orderAPI } from "../services/order.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Payment({ listOrder, setListOrder }) {
  const navigate = useNavigate();
  const [sum, setSum] = useState(0);
  useEffect(() => {
    let sumCurr = 0;
    for (let i = 0; i < listOrder.length; i++) {
      sumCurr += (listOrder[i].price * (100 - listOrder[i].sale)) / 100;
    }
    setSum(sumCurr);
  }, [listOrder]);
  const order = async () => {
    if (listOrder.length > 0) {
      await orderAPI(listOrder.map((i) => i.item_id));
      toast.success("Đặt hàng thành công");
      navigate("/order-success");
    }
  };
  return (
    <div className="payment">
      <h2>Chi Tiết Đơn hàng</h2>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Loại</th>
            <th>Giá (VNĐ)</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody></tbody>
        {listOrder.map((product, index) => {
          return (
            <tr key={"order" + product.item_id}>
              <td>{product.name}</td>
              <td>
                {product.color_name}, {product.size_name}
              </td>
              <td>
                {((product.price * (100 - product.sale)) / 100).toLocaleString(
                  "vi-VN"
                )}
                đ
              </td>
              <td>{product.quantity_item}</td>
            </tr>
          );
        })}
        {listOrder.length !== 0 && (
          <tr>
            <td colSpan="4" style={{ textAlign: "right" }}>
              Tổng: {sum.toLocaleString("vi-VN")}đ
            </td>
          </tr>
        )}
      </table>
      {listOrder.length === 0 && (
        <div style={{ width: "50%", alignSelf: "center" }}>
          <img style={{ width: "100%" }} src={empty}></img>
          <p
            style={{ fontSize: "16px", fontWeight: "600", textAlign: "center" }}
          >
            Vui lòng chọn các sản phẩm trong giỏ hàng trước khi thanh toán
          </p>
        </div>
      )}
      <div className="order btn12" onClick={order}>
        Mua hàng
      </div>
    </div>
  );
}
