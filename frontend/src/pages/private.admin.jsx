import { Children, useContext, useState } from "react";
import { MainContext } from "../context/main.context";
import UserBox from "../user/user.box";
import { Link } from "react-router-dom";

const PrivateAdmin = (props) => {
  const { user } = useContext(MainContext);
  const [boxUser, setBoxUser] = useState("");
  return (
    <>
      {user && user.username !== "" && user.role === "admin" ? (
        <>{props.children}</>
      ) : (
        <div
          style={{
            width: "100%",
            minHeight: "calc(100vh - 440px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          <div>
            Chỉ có quyền quản lý mới có thể truy nhập và đường link này.
          </div>
          <div>
            <Link to="/">Trở lại trang chủ</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivateAdmin;
