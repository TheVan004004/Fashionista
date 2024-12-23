import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function OrderManage() {
  const [listProducts, setListProducts] = useState([]);
  const [listProductsCache, setListProductsCache] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const getAllOrder = async () => {};
  return (
    <>
      <h2>Product:</h2>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <button
            className={isEdit ? "active" : ""}
            onClick={() => setIsEdit(true)}
          >
            Chỉnh sửa
          </button>
          <button onClick={() => setIsEdit(false)}>Lưu thay đổi</button>
        </div>

        <button>Thêm sản phẩm mới</button>
      </div> */}

      <table style={{ marginTop: "10px", position: "relative" }}>
        <thead>
          <tr>
            <th style={{ width: "200px" }}>Tên khách hàng</th>
            <th style={{ width: "100px" }}>Số điện thoại</th>
            <th style={{ width: "200px" }}>Địa chỉ</th>
            <th style={{ width: "200px" }}>Thời gian đặt hàng</th>
            <th style={{ width: "150px" }}>Trạng thái đơn hàng</th>
            <th style={{ width: "120px" }}></th>
          </tr>
        </thead>
        <tbody>
          {listProductsCache?.map((product, index) => {
            return (
              <tr className={product?.status === "delete" ? "pre_delete" : ""}>
                <td>{product.category_name}</td>
              </tr>
            );
          })}
        </tbody>
        {/* <div
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
        </div> */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: !isEdit ? "10" : "-10",
            backgroundColor: "white",
            opacity: "20%",
            cursor: "not-allowed",
          }}
        ></div>
      </table>
    </>
  );
}
