import React,{useState} from "react";
import './Register.css';
function Register(){
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [password1,setPassword1] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password != password1) {
      setErrorMessage("Mật khẩu không trùng khớp!");
    } else {
      setErrorMessage('');
      console.log("Username:", username, "Password:", password);
    }
  }
  return (
    <div className="register-container">    
      <h2>Đăng kí</h2>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Tên người dùng"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <input
        type="password"
        placeholder="Nhập lại mật khẩu"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit"> Register </button>
      </form>

    </div>
  );
}
export default Register;