import axios from "axios";
import { url } from "./url";

export const signUpAPI = (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  return axios.post(`${url}api/signup`, data, {
    withCredentials: true,
  });
};

export const loginAPI = (username, password) => {
  const data = {
    username: username,
    password: password,
  };

  return axios.post(`${url}api/login`, data, {
    withCredentials: true,
  });
};

export const logoutAPI = () => {
  return axios.post(`${url}api/logout`);
};

export const updateDataUserAPI = ({ phone, fullName, sex, dob, address }) => {
  const data = {
    phone: phone,
    fullName: fullName,
    sex: sex,
    dob: dob,
    address: address,
  };
  return axios.post(`${url}api/user/account/profile`, data, {
    withCredentials: true,
  });
};

export const getUserProfileAPI = () => {
  return axios.get(`${url}api/user/account/profile`, {
    withCredentials: true,
  });
};
