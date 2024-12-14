import { useContext, useState } from "react";
import { MainContext } from "../context/main.context";

const Profile = () => {
  const { user } = useContext(MainContext);
  const [username, setUsername] = useState("");
  const [accountname, setAccountname] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div id="profile">
      <div className="head">
        <h1>Hồ sơ của tôi</h1>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          width: "100%",
          gap: "10px",
        }}
      >
        <div className="left-body">
          <table>
            <tr>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td>Tên đăng nhập</td>
              <td>
                <p>{user.username}</p>
              </td>
            </tr>
            <tr>
              <td>Họ và tên</td>
              <td>
                <p>Họ tên</p>
              </td>
            </tr>
            <tr>
              <td>Mật khẩu</td>
              <td>
                <p>123456</p>
              </td>
            </tr>
            <tr>
              <td>Giới tính</td>
              <td>
                <select value={sex} onChange={(e) => setSex(e.target.value)}>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="order">Khác</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Ngày sinh</td>
              <td>
                <input type="date" value={selectedDate} />
              </td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
            </tr>
          </table>
        </div>
        <div className="right-body">
          <div>
            <div
              className="container-avatar"
              style={{
                borderStyle: "dashed",
              }}
            ></div>
            <div>
              <div>Chọn ảnh</div>
            </div>
            <div className="text">Dung lượng file tối đa 1MB</div>
            <div className="text">Định dạng: .JPEG, .PNG</div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button>Chỉnh sửa thông tin</button>
            <button>Lưu thông tin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
