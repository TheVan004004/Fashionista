import { useContext, useState } from "react";
import { validate, isRequired } from "../validation";
import { HiOutlineXCircle } from "react-icons/hi";
import { MainContext } from "../context/main.context";
import { toast } from "react-toastify";
import { loginAPI } from "../services/user.api";
const Login = ({ boxUser, setBoxUser, setIsOpenModalUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const { setUser } = useContext(MainContext);
  const handleSubmit = async () => {
    const nameError = validate(username, [isRequired]);
    const passwordError = validate(password, [isRequired]);
    setErrorNameMessage(nameError);
    setErrorPasswordMessage(passwordError);
    try {
      if (nameError === "" && passwordError === "") {
        const res = await loginAPI(username, password);
        const data = res.data.data;
        console.log(res);
        setUser(data);
        setIsOpenModalUser(false);
        toast.success("Đăng nhập thành công");
      }
    } catch (e) {
      // console.log();
      toast.error(e.response.data.message);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          fontSize: "24px",
        }}
      >
        <h3>Đăng nhập</h3>
        <HiOutlineXCircle
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setIsOpenModalUser(false)}
        />
      </div>
      <div className="container_input">
        <input
          className="pulse"
          type="text"
          placeholder="Tên người dùng"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorNameMessage("");
          }}
        />
        {errorNameMessage && <p>{errorNameMessage}</p>}
      </div>
      <div className="container_input">
        <input
          className="pulse"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorPasswordMessage("");
          }}
        />
        {errorPasswordMessage && <p>{errorPasswordMessage}</p>}
      </div>

      <button className="btn10" onClick={handleSubmit}>
        Đăng nhập
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <p>
          Bạn mới biết đến Fashionista?{" "}
          <a onClick={() => setBoxUser("isRegister")}>Đăng ký</a>
        </p>
      </div>
    </>
  );
};

export default Login;
