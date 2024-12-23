import React from "react";
import { updateStatusOrderAPI } from "../services/order.api";
import { HiXCircle } from "react-icons/hi";

const ModalOrderDetail = ({
  order,
  isOpenModalOrder,
  setIsOpenModalOrder,
  getOrder,
  setOrder,
}) => {
  const updateStatusOrder = async (order_id) => {
    try {
      await updateStatusOrderAPI(order_id);
      getOrder();
      setOrder((prev) => {
        const newO = { ...prev };
        newO.order.status = "completed";
        return newO;
      });
    } catch (e) {}
  };
  const getStatus = (status, order_id) => {
    const statusStyles = {
      pending: {
        text: "Chờ xác nhận",
        class: "btn4",
      },
      processing: {
        text: "Đang giao",
        class: "btn2",
        function: () => updateStatusOrder(order_id),
      },
      completed: {
        text: "Hoàn thành",
        class: "btn5",
      },
    };

    const style = {
      padding: "5px 10px",
      borderRadius: "1000px",
    };

    return (
      <button
        style={style}
        className={statusStyles[status]?.class}
        onClick={statusStyles[status]?.function}
      >
        {statusStyles[status]?.text || "Trạng thái không xác định"}
      </button>
    );
  };
  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        backgroundColor: isOpenModalOrder ? "#00000096" : "transparent",
        zIndex: isOpenModalOrder ? "100" : "-1",
        fontSize: "14px",
        transition: "ease-in-out 500ms",
      }}
    >
      <div
        className={
          isOpenModalOrder
            ? "modal-product-container active"
            : "modal-product-container"
        }
        style={{
          width: "750px",
          padding: "0",
          gap: "10px",
          border: "none",
        }}
      >
        <HiXCircle
          className="icon-react"
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            fontSize: "30px",
            color: "white",
          }}
          onClick={() => {
            setIsOpenModalOrder(false);
          }}
        />
        <h3
          style={{
            textAlign: "center",
            fontSize: "20px",
            padding: "15px 20px",
            backgroundColor: "var(--accent-color)",
            color: "white",
          }}
        >
          Chi tiết đơn hàng
        </h3>
        <div
          style={{
            padding: "10px 20px 30px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "16px",
            }}
          >
            <p>
              <b>Mã đơn hàng:</b> {order.order?.order_id}
            </p>
            <p>
              <b>Ngày đặt:</b> {order.order?.created_at.slice(0, 10)}
            </p>
            <p style={{ display: "flex", alignItems: "center" }}>
              <b>Trạng thái:</b>
              {"  "}
              {getStatus(order.order?.status, order.order?.order_id)}
            </p>
            <p>
              <b>Chi tiết hoá đơn:</b>
            </p>
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }}
          >
            <thead>
              <tr>
                <th style={styles.th}>Tên sản phẩm</th>
                <th style={styles.th}>Loại</th>
                <th style={styles.th}>Đơn giá</th>
                <th style={styles.th}>Số lượng</th>
                <th style={styles.th}>Giá</th>
              </tr>
            </thead>
            <tbody>
              {order.listProduct?.map((product, index) => (
                <tr key={index}>
                  <td style={styles.td}>{product.name}</td>
                  <td style={styles.td}>
                    {product.color_name}, {product.size_name}
                  </td>
                  <td style={styles.td}>
                    {(product.price * (1 - product.sale / 100)).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    đ
                  </td>
                  <td style={styles.td}>{product.quantity}</td>
                  <td style={styles.td}>
                    {(
                      product.price *
                      (1 - product.sale / 100) *
                      product.quantity
                    ).toLocaleString("vi-VN")}{" "}
                    đ
                  </td>
                </tr>
              ))}
              <tr colSpan={6}>
                <td
                  style={{
                    padding: "15px 8px",
                    textAlign: "center",
                    backgroundColor: "var(--blur-color)",
                    fontSize: "16px",
                    textAlign: "right",
                    fontWeight: "600",
                  }}
                  colSpan={6}
                >
                  Tổng giá trị đơn hàng:{" "}
                  {order?.order?.total.toLocaleString("vi-VN")} đ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  th: {
    borderBottom: "1px solid #ddd",
    padding: "15px 8px",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "transparent",
    color: "black",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
};

export default ModalOrderDetail;
