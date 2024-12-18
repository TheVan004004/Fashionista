import { useContext, useState } from "react";
import { MainContext } from "../context/main.context";
import { HiPencil } from "react-icons/hi";
import { updateDataUserAPI } from "../services/services";

const Profile = () => {
  const { user } = useContext(MainContext);
  const [username, setUsername] = useState(user.username);
  const [fullname, setFullname] = useState(user.name);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const updateDataUser = async () => {
    const res = await updateDataUserAPI({
      name: fullname,
      phone: phone,
      sex: sex,
      dob: dob,
      address: address,
    });
    setIsEdit(false);
  };
  return (
    <div id="profile">
      <div className="head">
        <h1>Hồ sơ của tôi</h1>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          width: "100%",
          gap: "10px",
        }}
      >
        <div className={isEdit ? "left-body isEdit" : "left-body"}>
          <table>
            <tr>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td>Tên đăng nhập</td>
              <td>
                <p
                  style={{
                    cursor: "not-allowed",
                    backgroundColor: "aliceblue",
                  }}
                >
                  {user.username}
                </p>
              </td>
            </tr>
            <tr>
              <td>Họ và tên</td>
              <td>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Mật khẩu</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    style={{
                      cursor: "not-allowed",
                      backgroundColor: "aliceblue",
                    }}
                    disabled
                    type="password"
                    value="12345678"
                  ></input>
                  <HiPencil
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
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
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              className="container-avatar"
              style={{
                borderStyle: "dashed",
              }}
            ></div>
            <div>
              <button
                style={{
                  padding: "10px 15px",
                }}
              >
                Chọn ảnh
              </button>
            </div>
            <div className="text">Dung lượng file tối đa 1MB</div>
            <div className="text">Định dạng: .JPEG, .PNG</div>
          </div>

          <div
            style={{
              zIndex: "50",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Chỉnh sửa thông tin
            </button>
            <button onClick={updateDataUser}>Lưu thông tin</button>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: !isEdit ? "10" : "-10",
            backgroundColor: "transparent",
            opacity: "30%",
            cursor: "not-allowed",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Profile;
