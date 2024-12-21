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
