import React, { useEffect, useState } from "react";
import { HiXCircle } from "react-icons/hi";
import { updateStatusOrderAdminAPI } from "../../services/admin.api";
import { viewOrderDetailAPI } from "../../services/order.api";

const ModalOrderAminDetail = ({
  order,
  isOpenModalOrder,
  setIsOpenModalOrder,
  getOrder,
  setOrder,
}) => {
  const [listOrder, setListOrder] = useState("");
  useEffect(() => {
    if (order && order.order_id) {
      getOrderDetail(order.order_id);
    }
  }, [order]);
  const getOrderDetail = async (order_id) => {
    const res = await viewOrderDetailAPI(order_id);
    setListOrder([...res.data.data]);
  };
  const updateStatusOrder = async (order_id) => {
    try {
      await updateStatusOrderAdminAPI(order_id);
      getOrder();
      setOrder((prev) => {
        const newO = { ...prev };
        newO.status = "processing";
        return newO;
      });
    } catch (e) {}
  };
  const getStatus = (status, order_id) => {
    const statusStyles = {
      pending: {
        text: "Chờ xác nhận",
        class: "btn4",
        function: () => updateStatusOrder(order_id),
      },
      processing: {
        text: "Đang giao",
        class: "btn2",
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
      <a
        style={style}
        className={statusStyles[status]?.class}
        onClick={statusStyles[status]?.function}
      >
        {statusStyles[status]?.text || "Trạng thái không xác định"}
      </a>
    );
  };
  return (
    <>
      {order &&
        order.order_id &&
        listOrder(
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
                    <b>Mã đơn hàng:</b> {order?.order_id}
                  </p>
                  <p>
                    <b>Khách hàng:</b> {order?.fullname}
                  </p>
                  <p>
                    <b>Địa chỉ:</b> {order?.address}
                  </p>
                  <p>
                    <b>Số điện thoại:</b> {order?.phone}
                  </p>
                  <p>
                    <b>Ngày đặt:</b> {order?.created_at?.slice(0, 10)}
                  </p>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <b>Trạng thái:</b>
                    {"  "}
                    {getStatus(order?.status, order?.order_id)}
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
                    {listOrder?.map((product, index) => (
                      <tr key={index}>
                        <td style={styles.td}>{product.name}</td>
                        <td style={styles.td}>
                          {product.color_name}, {product.size_name}
                        </td>
                        <td style={styles.td}>
                          {(
                            product.price *
                            (1 - product.sale / 100)
                          ).toLocaleString("vi-VN")}{" "}
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
                        {order?.total.toLocaleString("vi-VN")} đ
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
    </>
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

export default ModalOrderAminDetail;
