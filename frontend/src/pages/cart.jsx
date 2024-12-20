import React, { useState, useEffect, useContext } from "react";
import "../styles/pages/cart.css";
import ListProductInCart from "../cart/ListProductInCart";
import Payment from "../cart/Payment";
import { MainContext } from "../context/main.context";
import { getCartAPI } from "../services/cart.api";
export default function Cart() {
  const [listProductInCart, setListProductInCart] = useState([]);
  const { user, listResultSearch } = useContext(MainContext);
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    getCart();
  }, []);
  const getCart = async () => {
    const res = await getCartAPI();
    const data = res.data.data;
    setListProductInCart(data);
  };
  return (
    <div id="cart">
      <ListProductInCart
        listProductInCart={listProductInCart}
        setListProductInCart={setListProductInCart}
        listOrder={listOrder}
        listResultSearch={listResultSearch}
        setListOrder={setListOrder}
      />
      {listProductInCart.length > 0 && (
        <Payment
          listResultSearch={listResultSearch}
          setListOrder={setListOrder}
          listOrder={listOrder}
        />
      )}
    </div>
  );
}
