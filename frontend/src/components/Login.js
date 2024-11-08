
import React, { useState } from 'react';
import './Login.css'; 


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng nhập tại đây, ví dụ gửi dữ liệu lên server
    console.log("Username:", username, "Password:", password);
  };

  return (
    <div className="login-container">
      <div>
      <h2>Đăng nhập</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên người dùng"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <div>
        <p>Bạn mới biết đến Fashionista? </p>
      </div>
    </div>
  );
}

export default Login;
