import React, { useState, useEffect, useContext } from "react";
import "../styles/pages/cart.css";
import ListProductInCart from "../cart/ListProductInCart";
import Payment from "../cart/Payment";
import { getCartAPI } from "../services/services";
import { MainContext } from "../context/main.context";
export default function Cart() {
  const [listProductInCart, setListProductInCart] = useState([]);
  const { user, listResult } = useContext(MainContext);
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    getCart();
  }, []);
  const getCart = async () => {
    // const res = getCartAPI(user.id);
    // setListProductInCart(res);
  };
  return (
    <div id="cart">
      <ListProductInCart
        listOrder={listOrder}
        listResult={listResult}
        setListOrder={setListOrder}
      />
      <Payment
        listResult={listResult}
        setListOrder={setListOrder}
        listOrder={listOrder}
      />
    </div>
  );
}
