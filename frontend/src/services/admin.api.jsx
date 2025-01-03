import axios from "axios";
import { url } from "./url";

export const getAllUserAPI = (limit, page, sort) => {
  return axios.get(`${url}api/admin/getInfoBuyTurnUser`, {
    params: {
      limit: limit,
      page: page,
      sort: sort,
    },
    withCredentials: true,
  });
};

export const updateProductAPI = ({
  product_id,
  newName,
  newPrice,
  newSale,
}) => {
  const data = {
    newName: newName,
    newPrice: newPrice,
    newSale: newSale,
  };
  return axios.patch(`${url}api/admin/updateProduct/${product_id}`, data, {
    withCredentials: true,
  });
};

export const addNewProductAPI = (formData) => {
  return axios.post(`${url}api/admin/addNewProductDetail`, formData, {
    withCredentials: true,
  });
};

export const getChartBuyturnProductAPI = (product_id) => {
  return axios.get(`${url}api/admin/getBuyTurnByMonthOfProduct/${product_id}`, {
    withCredentials: true,
  });
};

export const getOrdersAPI = (status, limit, page) => {
  return axios.get(`${url}api/admin/getOrders?status=${status}`, {
    params: {
      limit: limit,
      page: page,
    },
    withCredentials: true,
  });
};
export const updateStatusOrderAdminAPI = (order_id) => {
  return axios.patch(
    `${url}api/admin/updateOrderAdmin/${order_id}`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const getInfoProductAdminAPI = (product_id) => {
  return axios.get(`${url}api/admin/getInfoProduct/${product_id}`, {
    withCredentials: true,
  });
};

export const getTotalSoldProductsByCategoryAPI = () => {
  return axios.get(`${url}api/admin/getTotalSoldProductsByCategory`, {
    withCredentials: true,
  });
};

export const getOrderQuantityByStatusAPI = () => {
  return axios.get(`${url}api/admin/getOrderQuantityByStatus`, {
    withCredentials: true,
  });
};

export const getTotalSalesByMonthAPI = () => {
  return axios.get(`${url}api/admin/getTotalSalesByMonth`, {
    withCredentials: true,
  });
};

export const getTotalBuyturnByMonthAPI = () => {
  return axios.get(`${url}api/admin/getProductsByMonth`, {
    withCredentials: true,
  });
};

export const updateQuantityProductDetailAPI = (id, quantity) => {
  const data = {
    new_quantity: quantity,
  };
  return axios.patch(
    `${url}api/admin/updateQuantityProductDetail/${id}`,
    data,
    {
      withCredentials: true,
    }
  );
};
