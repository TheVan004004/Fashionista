import { createContext, useEffect, useState } from "react";
import { getUserProfileAPI } from "../services/user.api";
import {
  getMostPopularAPI,
  getMostSaleAPI,
  searchAPI,
} from "../services/product.api";

export const MainContext = createContext({});

export const ContextWrapper = (props) => {
  const [colorFilter, setColorFilter] = useState("");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [listResultSearch, setListResultSearch] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [productDetail, setProductDetail] = useState(
    JSON.parse(localStorage.getItem("product_detail") || "") || ""
  );
  const [sort, setSort] = useState("most_buyturn");
  const [listPopular, setListPopular] = useState([]);
  const [listBestSaler, setListBestSaler] = useState([]);
  const [user, setUser] = useState("");
  const [isSearch, setIsSearching] = useState(false);
  useEffect(() => {
    getUserProfile();
    getProductPopular();
    getBestSaler();
  }, []);
  useEffect(() => {
    console.log(inputSearch, colorFilter, size, minPrice, maxPrice);
    search();
  }, [colorFilter, minPrice, maxPrice, sort]);
  useEffect(() => {
    localStorage.setItem("product_detail", JSON.stringify(productDetail));
  }, [productDetail]);
  const getUserProfile = async () => {
    try {
      const res = await getUserProfileAPI();
      const data = res.data.data;
      if (data) setUser(data[0]);
    } catch (e) {
      setUser("");
      console.log("check", e.response);
    }
  };
  const getProductPopular = async () => {
    const res = await getMostPopularAPI();
    const data = await res.data.data;
    setListPopular(data);
  };
  const getBestSaler = async () => {
    const res = await getMostSaleAPI();
    const data = await res.data.data;
    setListBestSaler(data);
  };
  const search = async () => {
    if (inputSearch === "") {
      return;
    }
    try {
      window.scrollTo({ top: 0 });
      const res = await searchAPI(
        inputSearch,
        colorFilter.hex_code,
        size,
        minPrice,
        maxPrice,
        sort
      );
      if (res && res.data) {
        const data = res.data.data;
        setListResultSearch(data);
      }
      setIsSearching(true);
    } catch (e) {}
  };
  return (
    <MainContext.Provider
      value={{
        sort,
        setSort,
        colorFilter,
        setColorFilter,
        size,
        setSize,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        listResultSearch,
        setListResultSearch,
        search,
        inputSearch,
        setInputSearch,
        productDetail,
        setProductDetail,
        listPopular,
        listBestSaler,
        user,
        setUser,
        isSearch,
        setIsSearching,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
