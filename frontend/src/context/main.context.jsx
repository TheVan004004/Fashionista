import { createContext, useEffect, useState } from "react";
import {
  searchAPI,
  getAllProductsAPI,
  getMostPopularAPI,
  getMostSaleAPI,
} from "../services/services";

export const MainContext = createContext({});

export const ContextWrapper = (props) => {
  const [colorFilter, setColorFilter] = useState("");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [listResult, setListResult] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [productDetail, setProductDetail] = useState(
    JSON.parse(localStorage.getItem("product_detail") || "") || ""
  );
  const [sort, setSort] = useState("most_buyturn");
  const [listPopular, setListPopular] = useState([]);
  const [listBestSaler, setListBestSaler] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "") || ""
  );
  const [isSearch, setIsSearching] = useState(false);
  console.log(user);
  useEffect(() => {
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
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  const getProductPopular = async () => {
    const res = await getMostPopularAPI();
    const data = await res.data;
    setListPopular(data);
  };
  const getBestSaler = async () => {
    const res = await getMostSaleAPI();
    const data = await res.data;
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
        const data = res.data;
        setListResult(data);
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
        listResult,
        setListResult,
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
