import { useState } from "react";
import "../styles/user.css"
import Login from "./Login";
import Register from "./Register";
const UserBox = ({ boxUser, setBoxUser }) => {
    return (
        <>
            {
                boxUser === "isLogin" &&
                <div style={{
                    position: "fixed",
                    left: "0",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#00000096",
                    zIndex: "100",
                    fontSize: "14px"
                }}>
                    <Login setBoxUser={setBoxUser} />
                </div>
            }
            {
                boxUser === "isRegister" &&
                <div style={{
                    position: "fixed",
                    left: "0",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#00000096",
                    zIndex: "100",
                    fontSize: "14px"
                }}>
                    <Register setBoxUser={setBoxUser} />
                </div>
            }
        </>

    )
}

export default UserBox;