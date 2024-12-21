import "../styles/pages/user.css";
import Login from "./Login";
import Register from "./Register";
const UserBox = ({
  boxUser,
  setBoxUser,
  isOpenModalUser,
  setIsOpenModalUser,
}) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          backgroundColor: isOpenModalUser ? "#00000096" : "transparent",
          zIndex: isOpenModalUser ? "100" : "-1",
          fontSize: "14px",
          transition: "ease-in-out 500ms",
        }}
      >
        <div
          className={
            isOpenModalUser
              ? "modal-user-container active"
              : "modal-user-container"
          }
        >
          {boxUser === "isLogin" && (
            <Login
              setBoxUser={setBoxUser}
              boxUser={boxUser}
              setIsOpenModalUser={setIsOpenModalUser}
            />
          )}
          {boxUser === "isRegister" && (
            <Register
              setBoxUser={setBoxUser}
              boxUser={boxUser}
              setIsOpenModalUser={setIsOpenModalUser}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserBox;
