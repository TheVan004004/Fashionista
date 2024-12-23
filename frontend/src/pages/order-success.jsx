import { Link, useNavigate } from "react-router-dom";
import order from "../access/order.jpg";
const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 240px)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={order} style={{ width: "300px", height: "300px" }} />
      <p style={{ fontSize: "24px" }}>
        Đặt hàng thành công. <Link to={"/"}> Quay lại trang chính </Link>
      </p>
    </div>
  );
};

export default OrderSuccess;
