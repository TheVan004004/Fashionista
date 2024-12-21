import { useContext, useState } from "react";
import { validate, isRequired, isConfirmed, minChar } from "../validation";
import { HiOutlineXCircle } from "react-icons/hi";
import { MainContext } from "../context/main.context";
import { toast } from "react-toastify";
import { signUpAPI } from "../services/user.api";
function Register({ boxUser, setBoxUser, setIsOpenModalUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorPasswordConfirmMessage, setErrorPasswordConfirmMessage] =
    useState("");
  const { setUser } = useContext(MainContext);
  const handleSubmit = async () => {
    const nameError = validate(username, [isRequired]);
    const passwordError = validate(password, [isRequired, minChar], { min: 5 });
    const passwordConfirmError = validate(
      passwordConfirm,
      [isRequired, isConfirmed],
      { valueConfirm: password }
    );
    setErrorNameMessage(nameError);
    setErrorPasswordMessage(passwordError);
    setErrorPasswordConfirmMessage(passwordConfirmError);
    if (
      nameError === "" &&
      passwordError === "" &&
      passwordConfirmError === ""
    ) {
      try {
        const res = await signUpAPI(username, password);
        const data = await res.data.data;
        setUser(data);
        setIsOpenModalUser(false);
        toast.success("Đăng ký thành công");
      } catch (e) {
        toast.error(e.response.data.message);
      }
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
        <h3>Đăng ký</h3>
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
      <div className="container_input">
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
            setErrorPasswordConfirmMessage("");
          }}
        />
        {errorPasswordConfirmMessage && <p>{errorPasswordConfirmMessage}</p>}
      </div>
      <button className="btn10" onClick={handleSubmit}>
        {" "}
        Register{" "}
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "nowrap",
        }}
      >
        <p>
          Bạn đã có tài khoản{" "}
          <a onClick={() => setBoxUser("isLogin")}>Đăng nhập</a>
        </p>
      </div>
    </>
  );
}
export default Register;
