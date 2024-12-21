import { useContext, useState } from "react";
import { HiOutlineClipboardList, HiOutlineUserCircle } from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";
import { MainContext } from "../context/main.context";
const User = () => {
  const navigate = useNavigate();
  const { user } = useContext(MainContext);
  return (
    <div id="user">
      <div id="left-section">
        <div id="account-user">
          <HiOutlineUserCircle
            style={{ fontSize: "48px" }}
            onClick={() => {}}
          />
          <div className="in4">
            <p style={{ fontSize: "24px", fontWeight: "600" }}>
              {user && user.username}
            </p>
            {/* <p>Sửa hồ sơ</p> */}
          </div>
        </div>
        <div className="navbar_user">
          <button
            onClick={() => {
              navigate("/user");
            }}
          >
            <HiOutlineUserCircle />
            <div className="text">Tài khoản của tôi</div>
          </button>

          <button
            onClick={() => {
              navigate("/user/shopping");
            }}
          >
            <HiOutlineClipboardList />
            <div className="text">Đơn mua</div>
          </button>
        </div>
      </div>
      <div id="right-section">
        <Outlet />
      </div>
    </div>
  );
};
export default User;
