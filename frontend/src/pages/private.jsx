import { Children, useContext, useState } from "react"
import { MainContext } from "../context/main.context"
import UserBox from "../user/user.box"

const Private = (props) => {
    const { user } = useContext(MainContext)
    const [boxUser, setBoxUser] = useState("")
    return (
        <>
            {
                user && user.username !== ""
                    ?
                    <>
                        {props.children}
                    </>
                    :
                    <div style={{
                        width: "100%", minHeight: "calc(100vh - 440px)",
                        display: "flex", justifyContent: "center",
                        alignItems: "center"
                    }}>
                        Vui lòng  &nbsp; <a
                            onClick={
                                () => setBoxUser("isLogin")
                            }
                        > đăng nhập</a>  &nbsp; hoặc &nbsp; <a
                            onClick={
                                () => setBoxUser("isRegister")
                            }
                        > đăng ký</a>  &nbsp; để sử dụng tính năng này
                        <UserBox
                            boxUser={boxUser}
                            setBoxUser={setBoxUser}
                        />
                    </div>

            }
        </>
    )
}

export default Private