import { useEffect, useState } from "react";
import {
  getOrderUserAPI,
  updateStatusOrderAPI,
  viewOrderDetailAPI,
} from "../services/order.api";
import { HiChevronLeft, HiChevronRight, HiOutlineEye } from "react-icons/hi";
import ModalOrderDetail from "../components/ModalOrderDetail";
import empty from "../access/empty.png";
const ShopList = () => {
  const [listOrder, setListOrder] = useState([]);
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [status, setStatus] = useState({ eng: "", vn: "" });
  const [limitSearch, setLimitSearch] = useState(8);
  const [pageSearch, setPageSearch] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getOrder();
  }, [status, pageSearch]);
  const getOrder = async () => {
    const res = await getOrderUserAPI(status.eng, limitSearch, pageSearch);
    const data = res.data.data;
    setListOrder(data.orders);
    setTotalPage(data.pageInfo.totalPages);
    setPrevPage(data.pageInfo.prevPage);
    setNextPage(data.pageInfo.nextPage);
  };
  const updateStatusOrder = async (order_id) => {
    try {
      await updateStatusOrderAPI(order_id);
      getOrder();
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
  const viewOrderDetail = async (order_id, order) => {
    const res = await viewOrderDetailAPI(order_id);
    setOrderDetail({ listProduct: [...res.data.data], order: order });
    setIsOpenModalOrder(true);
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          padding: "15px 20px",
          fontSize: "18px",
          fontWeight: "600",
          borderBottom: "1px solid black",
        }}
      >
        <p
          style={{ textAlign: "center", padding: "5px", cursor: "pointer" }}
          onClick={() => {
            setStatus({ eng: "", vn: "" });
            setPageSearch(1);
          }}
        >
          Tất cả
        </p>
        <p
          style={{ textAlign: "center", padding: "5px", cursor: "pointer" }}
          onClick={() => {
            setPageSearch(1);
            setStatus({ eng: "pending", vn: "chờ xác nhận" });
          }}
        >
          Chờ xác nhận
        </p>
        <p
          style={{ textAlign: "center", padding: "5px", cursor: "pointer" }}
          onClick={() => {
            setPageSearch(1);
            setStatus({ eng: "processing", vn: "đang giao hàng" });
          }}
        >
          Đang giao hàng
        </p>
        <p
          style={{ textAlign: "center", padding: "5px", cursor: "pointer" }}
          onClick={() => setStatus({ eng: "completed", vn: "hoàn thành" })}
        >
          Hoàn thành
        </p>
      </div>
      <div style={{ padding: "20px 40px" }}>
        {listOrder.length > 0 ? (
          <>
            <table style={{ width: "100%", boxShadow: "none" }}>
              <thead>
                <tr>
                  <th style={{ width: "100px", textAlign: "center" }}>
                    Mã đơn hàng
                  </th>
                  <th style={{ width: "200px", textAlign: "center" }}>
                    Thời gian đặt
                  </th>
                  <th style={{ width: "200px", textAlign: "center" }}>
                    Tổng giá trị
                  </th>
                  <th style={{ width: "150px", textAlign: "center" }}>
                    Trạng thái đơn hàng
                  </th>
                  <th style={{ width: "30px" }}></th>
                </tr>
              </thead>
              <tbody>
                {listOrder?.map((order, index) => {
                  return (
                    <>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {order.order_id}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {order.created_at.slice(0, 10)}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {order.total.toLocaleString("vi-VN")} VNĐ
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {getStatus(order.status, order.order_id)}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <HiOutlineEye
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              viewOrderDetail(order.order_id, order)
                            }
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
              {nextPage === null && prevPage === null ? (
                <></>
              ) : (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    gap: "10px",
                    zIndex: "20",
                    marginTop: "10px",
                  }}
                >
                  {pageSearch !== 1 && (
                    <HiChevronLeft
                      style={{
                        fontSize: "30px",
                      }}
                      onClick={() =>
                        setPageSearch((prev) => (prev === 1 ? 1 : prev - 1))
                      }
                    />
                  )}
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "right",
                      alignItems: "center",
                      gap: "20px",
                      zIndex: "20",
                    }}
                  >
                    {prevPage && (
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "1000px",
                          backgroundColor: "var(--blur-color)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => setPageSearch((prev) => prev - 1)}
                      >
                        {prevPage}
                      </div>
                    )}

                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "1000px",
                        backgroundColor: "var(--accent-color)",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      {pageSearch}
                    </div>
                    {nextPage && (
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "1000px",
                          backgroundColor: "var(--blur-color)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => setPageSearch((prev) => prev + 1)}
                      >
                        {nextPage}
                      </div>
                    )}
                  </div>
                  {pageSearch < totalPage && (
                    <HiChevronRight
                      style={{
                        fontSize: "30px",
                      }}
                      onClick={() =>
                        setPageSearch((prev) =>
                          prev === totalPage ? prev : prev + 1
                        )
                      }
                    />
                  )}
                </div>
              )}
            </table>
            <ModalOrderDetail
              setOrder={setOrderDetail}
              getOrder={getOrder}
              order={orderDetail}
              isOpenModalOrder={isOpenModalOrder}
              setIsOpenModalOrder={setIsOpenModalOrder}
            />
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "300px", height: "300px" }}
                src={empty}
                alt="empty"
              />
              <div className="text" style={{ fontWeight: "600" }}>
                Chưa có đơn hàng nào
                {status.eng === "" ? "." : ` ở trạng thái ${status.vn}`}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ShopList;
