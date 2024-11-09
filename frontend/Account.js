import React,{useState} from "react";
import './Account.css';


function Account(){
  const[username,setUsername] = useState('');
  const[accountname,setAccountname] = useState('');
  const[password,setPassword] = useState('');
  const[sex,setSex] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const[address,setAddress] = useState('');



  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Accountname:",accountname,
                "Username: ",username,
                "Password: ",password,
                "Sex: ",sex

    )
  }

  return(
  
    <div className="body1">
      <div id="left-section">
        
        <div id="account-user">
          <div>
          <img src={`${process.env.PUBLIC_URL}/img/user-image.jpg`} alt="User-image" />
          </div>
          <div className="in4">
            <p1>Tên tài khoản</p1>
            <p>Sửa hồ sơ</p>
          </div>
          
          </div>
        
        <div id="my-account">
          <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
          </div>
          <div className="text">Tài khoản của tôi</div>
        </div>
        <div id="shopping-list">
          <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
          </div>
          <div className="text">
          Đơn mua
          </div>
        </div>
      </div>
      <div id="right-section">
      
      <div className="head">
        <h3>Hồ sơ của tôi</h3>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
  
      <div className="body2">
        <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="tool-tip">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={accountname}
              onChange={(e) => setAccountname(e.target.value)}
          />
          </div>
          <div className="tool-tip">
            <label>Họ và tên</label>
            <input 
              type="text"
              name="username"
              value={username}
              onChange= {(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="tool-tip">
            <label>Mật khẩu</label>
            <input 
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div id="sex">
            <label>Giới tính</label>
            <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="/"></option>
              <option value="Nam">Nam</option>
              <option value="Nu">Nữ</option>
              <option value="Khac">Khác</option>
            </select>
          </div>
          <div id="dob">
            <label>Ngày sinh</label>
            <input type="date" value={selectedDate} onChange={handleDateChange}/>
          </div>
          <div className="tool-tip">
            <label>Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button id="save" type="submit">LƯU</button>
        </form>
        </div>
        <div id="pick-img">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
        <div>
          <button>Chọn ảnh</button>
        </div>
        <div className="text">Dung lượng file tối đa 1MB</div>
        <div className="text">Định dạng: .JPEG, .PNG</div>
        </div>
      </div>
      </div>
    </div>
  )
}
export default Account