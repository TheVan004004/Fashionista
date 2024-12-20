import axios from "axios";
import { url } from "./url";

export const getAllUserAPI = () => {
  return axios.get(`${url}api/admin/getInfoBuyTurnUser`, {
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
