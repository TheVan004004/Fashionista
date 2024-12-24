import { createContext, useEffect, useState } from "react";
import { getUserProfileAPI } from "../services/user.api";
import {
  getAllCategoryAPI,
  getMostPopularAPI,
  getMostSaleAPI,
  searchAPI,
} from "../services/product.api";

export const MainContext = createContext({});

export const ContextWrapper = (props) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [listResultSearch, setListResultSearch] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [productDetail, setProductDetail] = useState(
    JSON.parse(localStorage.getItem("product_detail")) || ""
  );
  const [sort, setSort] = useState("most_buyturn");
  const [listPopular, setListPopular] = useState([]);
  const [listBestSaler, setListBestSaler] = useState([]);
  const [user, setUser] = useState("");
  const [isSearch, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pageSearch, setPageSearch] = useState(1);
  const [limitSearch, setLimitSearch] = useState(16);
  const [nextPageSearch, setNextPageSearch] = useState(1);
  useEffect(() => {
    getUserProfile();
    getProductPopular();
    getBestSaler();
    getAllCategory();
  }, []);
  useEffect(() => {
    search();
  }, [
    colorFilter,
    minPrice,
    maxPrice,
    sort,
    limitSearch,
    pageSearch,
    categoryFilter,
  ]);
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
  const getAllCategory = async () => {
    try {
      const res = await getAllCategoryAPI();
      setCategories(res.data.data);
    } catch (e) {
      console.log("check", e.response);
    }
  };
  const getProductPopular = async () => {
    const res = await getMostPopularAPI();
    const data = await res.data.data.products;
    setListPopular(data);
  };
  const getBestSaler = async () => {
    const res = await getMostSaleAPI();
    const data = await res.data.data.products;
    setListBestSaler(data);
  };
  const search = async () => {
    try {
      window.scrollTo({ top: 0 });
      const res = await searchAPI(
        inputSearch,
        colorFilter.hex_code,
        size,
        minPrice,
        maxPrice,
        sort,
        categoryFilter,
        pageSearch,
        limitSearch
      );
      if (res && res.data) {
        const data = res.data.data.products;
        setListResultSearch(data);
      }
      setIsSearching(true);
    } catch (e) {}
  };
  return (
    <MainContext.Provider
      value={{
        getAllCategory,
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
        categories,
        setCategories,
        categoryFilter,
        setCategoryFilter,
        pageSearch,
        setPageSearch,
        limitSearch,
        setLimitSearch,
        nextPageSearch,
        setNextPageSearch,
        getUserProfile,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
