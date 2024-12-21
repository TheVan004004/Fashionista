import React, { useEffect, useState } from "react";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import { getAllUserAPI } from "../../services/admin.api";
export default function CustomerManage() {
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const res = await getAllUserAPI();
    setListUsers(res.data.data);
  };
  return (
    <>
      <h2>Khách hàng:</h2>
      <table style={{ marginTop: "10px", position: "relative" }}>
        <thead>
          <tr>
            <th>Tên tài khoản</th>
            <th>Họ tên khách hàng</th>
            <th>Giới tính</th>
            <th>Địa chỉ</th>
            <th>Số lượt mua hàng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user, index) => {
            return (
              <tr>
                <td>{user.username}</td>
                <td>{user.fullname || "Không"}</td>
                <td>
                  {user.sex === "male"
                    ? "Nam"
                    : user.sex === "female"
                    ? "Nữ"
                    : "Không"}
                </td>
                <td>{user.address || "Không"}</td>
                <td>{user.buyturn}</td>
                <td className="action">
                  <HiPencilAlt className="icon edit" />
                  <HiOutlineTrash className="icon remove" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
