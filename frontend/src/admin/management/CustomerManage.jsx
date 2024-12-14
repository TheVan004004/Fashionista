import React from "react";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
export default function CustomerManage() {
  const listUsers = [1, 2, 3, 4, 5, 6];
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
          {listUsers.map((product, index) => {
            return (
              <tr>
                <td>tên tài khoản</td>
                <td>Họ tên khách hàng</td>
                <td>Giới tính</td>
                <td>Địa chỉ</td>
                <td>Luợt mua hàng</td>
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
