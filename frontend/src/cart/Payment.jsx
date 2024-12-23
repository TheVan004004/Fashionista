import React, { useContext, useEffect, useState } from "react";
import empty from "../access/empty.png";
import { orderAPI } from "../services/order.api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../context/main.context";
export default function Payment({ listOrder, setListOrder }) {
  const { user } = useContext(MainContext);
  const navigate = useNavigate();
  const [sum, setSum] = useState(0);
  useEffect(() => {
    let sumCurr = 0;
    for (let i = 0; i < listOrder.length; i++) {
      sumCurr +=
        (listOrder[i].price *
          (100 - listOrder[i].sale) *
          listOrder[i].quantity_item) /
        100;
    }
    setSum(sumCurr);
  }, [listOrder]);
  const order = async () => {
    if (listOrder.length > 0) {
      if (!user.fullname && !user.phone && !user.address) {
        toast.error("Hãy điền đầy đủ thông tin cá nhân trước khi đặt hàng");
        return;
      }
      await orderAPI(listOrder.map((i) => i.item_id));
      toast.success("Đặt hàng thành công");
      navigate("/order-success");
    }
  };
  return (
    <div className="payment">
      <h2>Chi Tiết Đơn hàng</h2>
      {listOrder.length > 0 && (
        <table>
          <thead>
            <tr>
              <th
                style={{
                  width: "200px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Tên sản phẩm
              </th>
              <th
                style={{
                  width: "60px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Loại
              </th>
              <th
                style={{
                  width: "60px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Đơn giá
              </th>
              <th
                style={{
                  width: "100px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Số lượng
              </th>
              <th>Giá </th>
            </tr>
          </thead>
          <tbody></tbody>
          {listOrder.map((product, index) => {
            return (
              <tr key={"order" + product.item_id}>
                <td
                  style={{
                    width: "200px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.name}
                </td>
                <td
                  style={{
                    width: "40px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.color_name}, {product.size_name}
                </td>
                <td>
                  {(
                    (product.price * (100 - product.sale)) /
                    100
                  ).toLocaleString("vi-VN")}
                  đ
                </td>
                <td
                  style={{
                    width: "100px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {product.quantity_item}
                </td>
                <td
                  style={{
                    width: "100px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {(
                    ((product.price * (100 - product.sale)) / 100) *
                    product.quantity_item
                  ).toLocaleString("vi-VN")}
                  đ
                </td>
              </tr>
            );
          })}
          {listOrder.length !== 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "right" }}>
                Tổng: {sum.toLocaleString("vi-VN")}đ
              </td>
            </tr>
          )}
        </table>
      )}

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
      {!user.fullname && !user.phone && !user.address && (
        <div
          style={{
            color: "var(--sale-color)",
            fontSize: "20px",
            fontWeight: "400",
          }}
        >
          Bạn đang chưa điền đầy đủ thông tin cá nhân.{" "}
          <Link to="/user">Ấn vào đây</Link> để chỉnh sửa.
        </div>
      )}

      <div className="order btn12" onClick={order}>
        Mua hàng
      </div>
    </div>
  );
}
