import React, { useEffect, useState } from "react";
import { HiOutlineSearch, HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import { getAllUserAPI } from "../../../services/admin.api";
import "./style.css";
export default function CustomerManage() {
  const [listUsers, setListUsers] = useState([]);
  const [sortBy, setSortBy] = useState("most_buyturn");
  const [inputSearch, setInputSearch] = useState("");
  const [limitSearch, setLimitSearch] = useState(10);
  const [pageSearch, setPageSearch] = useState(1);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const res = await getAllUserAPI();
    setListUsers(res.data.data.infoUserBuyTurn);
  };

  return (
    <>
      <h2>Khách hàng:</h2>
      <div className="filter-normal-user">
        {/* <div className="search-manage btn10">
          <input
            value={inputSearch}
            placeholder="Tìm kiếm sản phẩm"
            onChange={(e) => setInputSearch(e.target.value)}
          ></input>
          <HiOutlineSearch style={{ fontSize: "20px", color: "black" }} />
        </div>  */}
        <div className="select-manage">
          <div style={{ textWrap: "nowrap" }}>Sắp xếp theo:</div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value={"most_buyturn"}>Mua nhiều nhất</option>
            <option value={"least_buyturn"}>Mua ít nhất</option>
          </select>
        </div>

        <div className="select-manage">
          <div style={{ textWrap: "nowrap" }}>Giới hạn:</div>
          <select
            value={limitSearch}
            onChange={(e) => {
              setLimitSearch(e.target.value);
              setPageSearch(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={null}>Không</option>
          </select>
        </div>
      </div>
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
