import axios from "axios";
import { url } from "./url";

export const searchAPI = (
  name,
  color,
  size,
  minprice,
  maxprice,
  sort,
  page,
  limit
) => {
  const data = {
    params: {
      name: name,
      color: color,
      size: size,
      price_range: minprice !== "" ? `${minprice}-${maxprice}` : "",
      sort: sort,
      page: page,
      limit: limit,
    },
  };
  return axios.get(`${url}api/collection`, data);
};

export const getProductByNameAPI = (name) => {
  return axios.get(`${url}api/collection?name=${name}`);
};

export const getProductsAPI = (input) => {
  const data = {
    params: {
      page: input?.page || "",
      limit: input?.limit || "",
    },
  };
  return axios.get(`${url}api/collection`, data);
};

export const getAllColorAPI = () => {
  return axios.get(`${url}api/collection/color`);
};

export const getMostPopularAPI = () => {
  return axios.get(`${url}api/collection?sort=most_buyturn`);
};

export const getMostSaleAPI = () => {
  return axios.get(`${url}api/collection?sort=sale_desc`);
};

export const viewDetailProductAPI = ({ product_id, size, color }) => {
  const data = {
    params: {
      id: product_id,
      size: size,
      color: color,
    },
  };
  return axios.get(`${url}api/product/${product_id}`, data);
};
