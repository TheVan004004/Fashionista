import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/main.context";
import { logoutAPI } from "../services/user.api";
const DropdownMenu = () => {
  const { setUser } = useContext(MainContext);
  const navigate = useNavigate();
  const logout = async () => {
    logoutAPI();
    setUser("");
    navigate("/");
  };
  return (
    <div htmlFor="menu-user-check" id="menu-user">
      <input type="checkbox" id="menu-user-check" defaultChecked />
      <a
        className="btn"
        onClick={() => {
          navigate("/admin");
        }}
      >
        Quản lý sản phẩm
      </a>
      <a
        className="btn"
        onClick={() => {
          navigate("/user");
        }}
      >
        Tài khoản của tôi
      </a>
      <a
        className="btn"
        onClick={() => {
          navigate("/user/shopping");
        }}
      >
        Đơn hàng
      </a>
      <a className="btn" onClick={logout}>
        Đăng xuất{" "}
      </a>
    </div>
  );
};

export default DropdownMenu;
