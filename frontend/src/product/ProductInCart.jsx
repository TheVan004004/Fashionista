import React, { useEffect, useState } from "react";

export default function ({
  product,
  setListOrder,
  index,
  setListProductInCart,
}) {
  //   console.log(product);
  return (
    <div className="product">
      <input
        checked={product.checked}
        type="checkbox"
        id={`${product.id}`}
        style={{ flexShrink: "0" }}
        onChange={(e) => {
          setListProductInCart((prev) => {
            const newL = [...prev];
            newL[index].checked = e.target.checked;
            return newL;
          });
          if (e.target.checked) {
            setListOrder((prev) => [...prev, product]);
          } else {
            setListOrder((prev) => prev.filter((p) => p.id !== product.id));
          }
        }}
      />
      <div className="container-product">
        <img
          style={{ height: "150px", width: "120px", objectFit: "cover" }}
          src={product.image}
        ></img>
        <div
          style={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {product.name}
            </p>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "400",
                color: "var(--sale-color)",
              }}
            >
              {(product.price * (1 - product.sale) * 1000).toLocaleString(
                "vi-VN"
              )}
              đ
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <div
                style={{
                  padding: "10px 15px",
                  backgroundColor: "var(--blur-color)",
                  borderRadius: "10px",
                }}
              >
                màu
              </div>
              <div
                style={{
                  borderRadius: "10px",
                  padding: "10px 15px",
                  backgroundColor: "var(--blur-color)",
                }}
              >
                size
              </div>
            </div>
            <div
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "10px 10px",
              }}
            >
              <div style={{ display: "flex", gap: "15px" }}>
                <div>-</div>
                <p>2</p>
                <div>+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
