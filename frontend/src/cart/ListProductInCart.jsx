import React, { useEffect, useState } from "react";
import ProductInCart from "../product/ProductInCart";
import { Link } from "react-router-dom";
import empty from "../access/empty.png";
export default function ListProductInCart({
  listProductInCart,
  setListProductInCart,
  setListOrder,
  listOrder,
}) {
  return (
    <div className="container-list-product">
      {listProductInCart.length > 0 ? (
        <>
          <h2>Giỏ hàng</h2>
          <div>
            <input
              type="checkbox"
              id="pickAll"
              checked={listProductInCart.length === listOrder.length}
              onChange={(e) => {
                setListProductInCart((prev) => {
                  const newL = [...prev];
                  newL.forEach((p) => {
                    p.checked = e.target.checked;
                  });
                  return newL;
                });
                setListOrder((prev) =>
                  e.target.checked ? listProductInCart : []
                );
              }}
            />
            <label htmlFor="pickAll" style={{ marginLeft: "10px" }}>
              Chọn tất cả
            </label>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img style={{ width: "20%" }} src={empty}></img>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              textAlign: "center",
              width: "100%",
            }}
          >
            Giỏ hàng của bạn đang trống.{" "}
            <Link to="/search">Tìm kiếm sản phẩm ngay?</Link>
          </p>
        </div>
      )}
      <div className="list-product">
        {listProductInCart.map((product, index) => {
          return (
            <ProductInCart
              product={product}
              key={index}
              index={index}
              setListOrder={setListOrder}
              listOrder={listOrder}
              setListProductInCart={setListProductInCart}
            />
          );
        })}
      </div>
    </div>
  );
}
