import React, { useEffect, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineSearch,
  HiOutlineTrash,
  HiPencilAlt,
} from "react-icons/hi";
import { getAllUserAPI } from "../../../services/admin.api";
import "./style.css";
export default function CustomerManage() {
  const [listUsers, setListUsers] = useState([]);
  const [sortBy, setSortBy] = useState("desc");
  const [inputSearch, setInputSearch] = useState("");
  const [limitSearch, setLimitSearch] = useState(10);
  const [pageSearch, setPageSearch] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  useEffect(() => {
    getUser();
  }, [limitSearch, pageSearch, sortBy]);
  const getUser = async () => {
    const res = await getAllUserAPI(limitSearch, pageSearch, sortBy);
    const data = res.data.data;
    setListUsers(res.data.data.infoUserBuyTurn);
    setTotalPage(data.pageInfo.totalPages);
    setPrevPage(data.pageInfo.prevPage);
    setNextPage(data.pageInfo.nextPage);
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
            <option value={"desc"}>Mua nhiều nhất</option>
            <option value={"asc"}>Mua ít nhất</option>
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
      <table
        style={{
          marginTop: "10px",
          position: "relative",
          tableLayout: "fixed",
          width: "100%",
        }}
      >
        <colgroup>
          <col style={{ width: "100px" }} />
          <col style={{ width: "150px" }} />
          <col style={{ width: "80px" }} />
          <col style={{ width: "180px" }} />
          <col style={{ width: "100px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Tên tài khoản</th>
            <th>Họ tên</th>
            <th>Giới tính</th>
            <th>Địa chỉ</th>
            <th>Số lượt mua hàng</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.fullname || "Không"}</td>
              <td>
                {user.sex === "Male"
                  ? "Nam"
                  : user.sex === "Female"
                  ? "Nữ"
                  : "Không"}
              </td>
              <td>{user.address || "Không"}</td>
              <td style={{ textAlign: "center" }}>{user.buyturn}</td>
              {/* <td className="action">
                <HiPencilAlt className="icon edit" />
                <HiOutlineTrash className="icon remove" />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {nextPage === null && prevPage === null ? (
        <></>
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            gap: "10px",
            zIndex: "20",
            marginTop: "10px",
          }}
        >
          {pageSearch !== 1 && (
            <HiChevronLeft
              style={{
                fontSize: "30px",
              }}
              onClick={() =>
                setPageSearch((prev) => (prev === 1 ? 1 : prev - 1))
              }
            />
          )}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              gap: "20px",
              zIndex: "20",
            }}
          >
            {prevPage && (
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "1000px",
                  backgroundColor: "var(--blur-color)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setPageSearch((prev) => prev - 1)}
              >
                {prevPage}
              </div>
            )}

            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "1000px",
                backgroundColor: "var(--accent-color)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {pageSearch}
            </div>
            {nextPage && (
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "1000px",
                  backgroundColor: "var(--blur-color)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setPageSearch((prev) => prev + 1)}
              >
                {nextPage}
              </div>
            )}
          </div>
          {pageSearch < totalPage && (
            <HiChevronRight
              style={{
                fontSize: "30px",
              }}
              onClick={() =>
                setPageSearch((prev) => (prev === totalPage ? prev : prev + 1))
              }
            />
          )}
        </div>
      )}
    </>
  );
}
