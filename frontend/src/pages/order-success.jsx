import { Link, useNavigate } from "react-router-dom";
const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        paddingTop: "150px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "24px" }}>
        Đặt hàng thành công. <Link to={"/"}> Quay lại trang chính </Link>
      </p>
    </div>
  );
};

export default OrderSuccess;
