
import { useState } from 'react';
import { validate, isRequired } from '../validation'
import { HiOutlineXCircle } from 'react-icons/hi';
const Login = ({ setBoxUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const handleSubmit = () => {
    const nameError = validate(username, [isRequired]);
    const passwordError = validate(password, [isRequired]);
    setErrorNameMessage(nameError);
    setErrorPasswordMessage(passwordError);
    if (nameError === "" && passwordError === "") {
      console.log("Username:", username, "Password:", password);
    }
  };

  return (
    <div className="login-container">
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

      <button onClick={handleSubmit}>Login</button>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}>
        <p>Bạn mới biết đến Fashionista? <a
          onClick={() => setBoxUser("isRegister")}
        >Đăng ký</a></p>
      </div>
    </div>
  );
}

export default Login;
