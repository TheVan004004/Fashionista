import React, { useEffect, useState } from "react";
import {
  getOrderQuantityByStatusAPI,
  getTotalBuyturnByMonthAPI,
  getTotalSalesByMonthAPI,
} from "../services/admin.api";
import PieChart from "./PieChart";
import ChartProductSales from "./management/product/ChartProductSales";
import ChartProductBuyTurn from "./management/product/ChartProductBuyTurn";

export default function Overview() {
  const [orderQuantityByStatus, setOrderQuantityByStatus] = useState([]);
  const [saleByMonth, setSaleByMonth] = useState([]);
  const [topMonth, setTopMonth] = useState(null);
  const [currentMonthSales, setCurrentMonthSales] = useState(0);
  const [buyturnByMonth, setBuyturnByMonth] = useState([]);
  const [topBuyMonth, setTopBuyMonth] = useState(null);
  const [currentMonthBuyturn, setCurrentMonthBuyturn] = useState(0);

  useEffect(() => {
    getOrderQuantityByStatus();
    getChartSales();
    getChartBuyturn();
  }, []);

  const getChartSales = async () => {
    const res = await getTotalSalesByMonthAPI();
    const data = res.data.data.map((d) => ({
      x: d.month,
      y: parseInt(d.total_sales_in_month),
    }));
    setSaleByMonth(data);

    const maxSales = Math.max(...data.map((d) => d.y));
    const topMonthData = data.find((d) => d.y === maxSales);
    setTopMonth(topMonthData);

    const currentMonth = new Date().getMonth() + 1;
    const currentMonthData = data.find((d) => d.x === currentMonth);
    setCurrentMonthSales(currentMonthData ? currentMonthData.y : 0);
  };

  const getChartBuyturn = async () => {
    const res = await getTotalBuyturnByMonthAPI();
    const data = res.data.data.map((d) => ({
      x: d.month,
      y: parseInt(d.total_products_in_month),
    }));
    setBuyturnByMonth(data);

    const maxSales = Math.max(...data.map((d) => d.y));
    const topMonthData = data.find((d) => d.y === maxSales);
    setTopBuyMonth(topMonthData);

    const currentMonth = new Date().getMonth() + 1;
    const currentMonthData = data.find((d) => d.x === currentMonth);
    setCurrentMonthBuyturn(currentMonthData ? currentMonthData.y : 0);
  };

  const getOrderQuantityByStatus = async () => {
    const statusMap = {
      pending: "Chờ Xác Nhận",
      processing: "Đang giao",
      completed: "Hoàn thành",
      confirmed: "Đã xác nhận", // Thêm trạng thái nếu cần
    };

    const res = await getOrderQuantityByStatusAPI();
    setOrderQuantityByStatus(
      res.data.data.map((d) => ({
        title: statusMap[d.status] || d.status,
        valuePercentage: parseInt(d.total_quantity),
      }))
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "0px 40px",
      }}
    >
      <div
        style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: "40px",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          borderRadius: "20px",
        }}
      >
        <PieChart data={orderQuantityByStatus} />
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <h2>Trạng thái đơn hàng</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {orderQuantityByStatus.map((data, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <b
                  style={{
                    fontSize: "24px",
                    color: "#1976d2",
                    marginBottom: "5px",
                  }}
                >
                  {data.valuePercentage}
                </b>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {data.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "40px",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          borderRadius: "20px",
        }}
      >
        <h2>Doanh thu theo tháng</h2> <div></div>
        <ChartProductSales data={saleByMonth} />
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Display flex column
            gap: "30px",
            padding: "10px",
            // backgroundColor: "var(--blur-color)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "800",
              }}
            >
              Tháng bán chạy nhất:{" "}
            </div>
            <div
              style={{
                fontSize: "18px",
                color: "var(--sale-color)",
              }}
            >
              {topMonth
                ? `${topMonth.y.toLocaleString("vi-VN")} VND`
                : "Đang tải..."}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              Doanh thu tháng này:{" "}
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "var(--sale-color)",
              }}
            >
              {currentMonthSales
                ? `${currentMonthSales.toLocaleString("vi-VN")} VND`
                : "Đang tải..."}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "40px",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          borderRadius: "20px",
        }}
      >
        <h2>Doanh số theo tháng</h2> <div></div>
        <ChartProductBuyTurn data={buyturnByMonth} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "800",
              }}
            >
              Tháng bán nhiều nhất:{" "}
            </div>
            <div
              style={{
                fontSize: "18px",
                color: "var(--sale-color)",
              }}
            >
              {topBuyMonth ? `${topBuyMonth.y} sản phẩm` : "Đang tải..."}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              Doanh thu tháng này:{" "}
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "var(--sale-color)",
              }}
            >
              {currentMonthBuyturn
                ? `${currentMonthBuyturn} sản phẩm`
                : "Đang tải..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
