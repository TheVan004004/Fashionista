import { useState } from "react";
import { HiOutlineClipboardList, HiOutlineHome, HiOutlineUserCircle } from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";


const User = () => {
  const navigate = useNavigate()
  const [state, setState] = useState("myAcc")
  return (

    <div id="user">
      <div id="left-section">
        <div id="account-user">
          <HiOutlineUserCircle
            style={{ fontSize: "48px" }}
            onClick={() => { }} />
          <div className="in4">
            <p style={{ fontSize: "24px", fontWeight: "600" }}>Tên tài khoản</p>
            {/* <p>Sửa hồ sơ</p> */}
          </div>
        </div>
        <div className="navbar_user">
          <button
            onClick={() => {
              navigate('/user')
              setState('myAcc')
            }}
            className={state === "myAcc" ? "active" : ""}
          >
            <HiOutlineUserCircle />
            <div className="text" >Tài khoản của tôi</div>
          </button>

          <button
            onClick={() => {
              navigate('/user/shopping')
              setState('shopping')
            }}
            className={state === "shopping" ? "active" : ""}
          >
            <HiOutlineClipboardList />
            <div className="text">
              Đơn mua
            </div>
          </button>
        </div>

      </div>
      <div id="right-section">
        <Outlet />
      </div>
    </div>
  )
}
export default User;