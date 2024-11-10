import { useState } from "react";
import { validate, isRequired, isConfirmed, minChar } from '../validation'
import { signUpAPI } from "../services/services";
import { HiOutlineXCircle } from "react-icons/hi";
function Register({ setBoxUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorPasswordConfirmMessage, setErrorPasswordConfirmMessage] = useState("");
  const handleSubmit = async () => {
    const nameError = validate(username, [isRequired]);
    const passwordError = validate(password, [isRequired, minChar], { min: 5 });
    const passwordConfirmError = validate(passwordConfirm, [isRequired, isConfirmed], { valueConfirm: password });
    setErrorNameMessage(nameError);
    setErrorPasswordMessage(passwordError);
    setErrorPasswordConfirmMessage(passwordConfirmError)
    if (nameError === "" && passwordError === "" && passwordConfirmError === "") {
      const res = await signUpAPI(username, password)
      const data = await res.json()
      console.log(data)
    }
  };
  return (
    <div className="register-container">
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
            cursor: "pointer"
          }}
          onClick={() => setBoxUser("")}
        />
      </div>
      <div className="container_input">
        <input
          type="text"
          placeholder="Tên người dùng"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setErrorNameMessage("")
          }}
        />
        {
          errorNameMessage &&
          <p >{errorNameMessage}</p>
        }
      </div>
      <div className="container_input">
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrorPasswordMessage("")
          }}
        />
        {
          errorPasswordMessage &&
          <p>{errorPasswordMessage}</p>
        }
      </div>
      <div className="container_input">
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value)
            setErrorPasswordConfirmMessage("")
          }}
        />
        {
          errorPasswordConfirmMessage &&
          <p>{errorPasswordConfirmMessage}</p>
        }
      </div>
      <button onClick={handleSubmit}> Register </button>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexWrap: "nowrap"
      }}>
        <p>Bạn đã có tài khoản <a
          onClick={() => setBoxUser("isLogin")}
        >Đăng nhập</a></p>
      </div>
    </div>
  );
}
export default Register;