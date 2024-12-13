import axios from "axios";
const url = "http://localhost:4000/";
const searchAPI = (name, color, size, minprice, maxprice, sort) => {
  const data = {
    params: {
      name: name,
      color: color,
      size: size,
      price_range: minprice !== "" ? `${minprice}-${maxprice}` : "",
      sort: sort,
    },
  };
  return axios.get(`${url}api/collection`, data);
};
const getAllProductsAPI = () => {
  return axios.get(`${url}api/collection`);
};

const getAllColorAPI = () => {
  return axios.get(`${url}api/collection/color`);
};

const getMostPopularAPI = () => {
  return axios.get(`${url}api/collection?sort=most_buyturn`);
};
const getMostSaleAPI = () => {
  return axios.get(`${url}api/collection?sort=sale_desc`);
};
const signUpAPI = (username, password) => {
  const data = {
    username: username,
    password: password,
    confirmPassword: password,
  };
  return axios.post(`${url}api/signup`, data);
};
const loginAPI = (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  return axios.post(`${url}api/login`, data);
};
export {
  searchAPI,
  getAllProductsAPI,
  signUpAPI,
  getAllColorAPI,
  getMostPopularAPI,
  getMostSaleAPI,
  loginAPI,
};
