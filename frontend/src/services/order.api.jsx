import axios from "axios";
import { url } from "./url";

export const getAllOrder = () => {};

export const orderAPI = (listItems) => {
  const data = {
    listItems: listItems,
  };
  return axios.post(`${url}api/order`, data, {
    withCredentials: true,
  });
};

export const getOrderUserAPI = (status, limit, page) => {
  return axios.get(`${url}api/getOrders?status=${status}`, {
    params: {
      limit: limit,
      page: page,
    },
    withCredentials: true,
  });
};

export const viewOrderDetailAPI = (order_id) => {
  return axios.get(`${url}api/getOrderInfo/${order_id}`, {
    withCredentials: true,
  });
};

export const updateStatusOrderAPI = (order_id) => {
  return axios.patch(
    `${url}api/order/${order_id}`,
    {},
    {
      withCredentials: true,
    }
  );
};
