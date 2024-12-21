import axios from "axios";
import { url } from "./url";

export const getCartAPI = () => {
  return axios.get(`${url}api/cart/`, {
    withCredentials: true,
  });
};

export const addToCartAPI = ({ product_details_id, quantity }) => {
  const data = {
    product_details_id: product_details_id,
    quantity: quantity,
  };

  return axios.post(`${url}api/cart/addProduct`, data, {
    withCredentials: true,
  });
};

export const deleteItemInCartAPI = (item_id) => {
  return axios.delete(`${url}api/cart/${item_id}`, {
    withCredentials: true,
  });
};

export const updateItemCartAPI = ({ item_id, color, size, quantity }) => {
  const data = {
    color: color,
    size: size,
    quantity: quantity,
  };

  return axios.patch(`${url}api/cart/${item_id}/updateCartItem`, data, {
    withCredentials: true,
  });
};
