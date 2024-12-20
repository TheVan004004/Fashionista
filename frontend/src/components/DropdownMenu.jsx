import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/main.context";
import { logoutAPI } from "../services/user.api";
const DropdownMenu = ({ isOpenMenu, setIsOpenMenu }) => {
  const { setUser } = useContext(MainContext);
  const navigate = useNavigate();
  const logout = async () => {
    logoutAPI();
    setUser("");
    navigate("/");
  };
  return (
    <div
      id="menu-user"
      style={{
        height: isOpenMenu ? "120px" : "0px",
      }}
    >
      <button
        onClick={() => {
          navigate("/admin");
          setIsOpenMenu(false);
        }}
      >
        Quản lý sản phẩm
      </button>
      <button
        onClick={() => {
          navigate("/user");
          setIsOpenMenu(false);
        }}
      >
        Tài khoản của tôi
      </button>
      <button
        onClick={() => {
          navigate("/user/shopping");
          setIsOpenMenu(false);
        }}
      >
        Đơn hàng
      </button>
      <button onClick={logout}>Đăng xuất </button>
    </div>
  );
};

export default DropdownMenu;
