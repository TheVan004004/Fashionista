import React, { useEffect, useState } from "react";
import ProductInCart from "../product/ProductInCart";

export default function ListProductInCart({
  listResult,
  setListOrder,
  listOrder,
}) {
  const [listProductInCart, setListProductInCart] = useState([]);
  useEffect(() => {
    setListProductInCart(
      listResult.map((product) => ({ ...product, checked: false }))
    );
  }, []);
  return (
    <div className="list-product">
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
            setListOrder((prev) => (e.target.checked ? listResult : []));
          }}
        />
        <label htmlFor="pickAll"> Chọn tất cả</label>
      </div>
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
  );
}
