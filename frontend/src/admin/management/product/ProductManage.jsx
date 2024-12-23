import React, { useContext, useEffect, useState } from "react";
import { HiOutlineSearch, HiPencilAlt } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";
import {
  getAllColorAPI,
  getProductsAPI,
  searchAPI,
} from "../../../services/product.api";
import { updateProductAPI } from "../../../services/admin.api";
import ModalProduct from "./ModalProduct";
import { MainContext } from "../../../context/main.context";
export default function ProductManage() {
  const { categories } = useContext(MainContext);
  const [listProducts, setListProducts] = useState([]);
  const [listProductsCache, setListProductsCache] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);
  const [productView, setProductView] = useState("");
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [sortBy, setSortBy] = useState("most_buyturn");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [limitSearch, setLimitSearch] = useState(10);
  const [pageSearch, setPageSearch] = useState(1);
  const [listColor, setListColor] = useState([]);
  useEffect(() => {
    getProduct();
  }, [
    inputSearch,
    colorFilter,
    sortBy,
    categoryFilter,
    minPrice,
    maxPrice,
    pageSearch,
    limitSearch,
  ]);
  useEffect(() => {
    getColor();
  }, []);
  const getProduct = async () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const res = await searchAPI(
        inputSearch,
        colorFilter,
        "",
        minPrice,
        maxPrice,
        sortBy,
        categoryFilter,
        pageSearch,
        limitSearch
      );
      if (res && res.data) {
        const data = res.data.data.products;
        setListProducts(data);
        setListProductsCache(data);
      }
    } catch (e) {}
  };
  const getColor = async () => {
    const res = await getAllColorAPI();
    const data = await res.data.data;
    setListColor(data);
  };

  const handleSave = async () => {
    setIsSaving(true);
    let isChange = false;
    try {
      for (let index = 0; index < listProductsCache.length; index++) {
        if (
          listProductsCache?.[index].name !== listProducts?.[index].name ||
          listProductsCache?.[index].sale !== listProducts?.[index].sale ||
          listProductsCache?.[index].price !== listProducts?.[index].price
        ) {
          await updateProductAPI({
            product_id: listProductsCache[index].id,
            newName: listProductsCache[index].name,
            newPrice: listProductsCache[index].price,
            newSale: listProductsCache[index].sale,
          });
          isChange = true;
        }
      }
      if (isChange) getProduct();
    } catch (e) {
      console.log(e);
    }

    setIsSaving(false);
    setIsEdit(false);
  };
  const onChangeDataInCache = (newProduct, index) => {
    setListProductsCache((prev) => {
      const newList = [...prev];
      newList[index] = {
        ...newProduct,
      };
      return newList;
    });
  };
  return (
    <>
      <h2>Product:</h2>
      <div
        className={
          isOpenFilter
            ? "manage-product-filter active"
            : "manage-product-filter"
        }
      >
        <div className="filter-normal">
          <div className="search-manage btn10">
            <input
              value={inputSearch}
              placeholder="Tìm kiếm sản phẩm"
              onChange={(e) => setInputSearch(e.target.value)}
            ></input>
            <HiOutlineSearch style={{ fontSize: "20px", color: "black" }} />
          </div>
          <div className="select-manage">
            <div style={{ textWrap: "nowrap" }}>Sắp xếp theo:</div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value={"most_buyturn"}>Bán chạy</option>
              <option value={"price_asc"}>Thấp đến cao</option>
              <option value={"price_desc"}>Cao đến thấp</option>
              <option value={"sale_desc"}>Sale</option>
            </select>
          </div>
          <button
            className="btn10"
            style={{
              borderRadius: "1000px",
              backgroundColor: "aliceblue",
              color: "black",
            }}
            onClick={() => setIsOpenFilter((prev) => !prev)}
          >
            Bộ lọc
          </button>
          <div className="select-manage">
            <div style={{ textWrap: "nowrap" }}>Giới hạn:</div>
            <select
              value={limitSearch}
              onChange={(e) => setLimitSearch(e.target.value)}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={null}>Không</option>
            </select>
          </div>
        </div>
        <div className="filter-extend">
          <div className="select-manage">
            <div style={{ textWrap: "nowrap" }}>Loại Sản phẩm:</div>
            <select
              value={categoryFilter}
              defaultValue={"Chọn loại sản phẩm"}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category, index) => {
                return (
                  <option key={index + category.name} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="select-manage">
            <div style={{ textWrap: "nowrap" }}>Màu sắc:</div>
            <select
              value={colorFilter}
              defaultValue={"Chọn màu sắc"}
              onChange={(e) => setColorFilter(e.target.value)}
            >
              {listColor.map((color, index) => {
                return (
                  <option key={index + color.hex_code} value={color.hex_code}>
                    {color.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="select-manage">
            <div style={{ textWrap: "nowrap" }}>Khoảng giá từ:</div>
            <select value={5}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={null}>Không</option>
            </select>
            <div style={{ textWrap: "nowrap" }}>đến:</div>
            <select value={5}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={null}>Không</option>
            </select>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <button
            className={isEdit ? "btn12 active" : "btn12"}
            onClick={() => setIsEdit(true)}
          >
            Chỉnh sửa
          </button>
          <button onClick={handleSave} className="btn10">
            Lưu thay đổi
          </button>
        </div>

        <button
          onClick={() => {
            setIsOpenModalProduct(true);
            setProductView([]);
          }}
        >
          Thêm sản phẩm mới
        </button>
      </div>

      <table
        style={{
          marginTop: "10px",
          position: "relative",
          boxShadow: !isEdit && "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
        }}
      >
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th style={{ width: "120px" }}>Loại</th>
            <th style={{ width: "120px" }}>Giá (VNĐ)</th>
            <th style={{ width: "100px" }}>Giảm giá</th>
            <th style={{ width: "140px" }}>Tổng lượt mua</th>
            <th style={{ width: "60px" }}></th>
          </tr>
        </thead>
        <tbody>
          {listProductsCache?.map((product, index) => {
            return (
              <tr
                className={product?.status === "delete" ? "pre_delete" : ""}
                key={product.id}
              >
                <td>
                  <input
                    value={product.name}
                    onChange={(e) =>
                      onChangeDataInCache(
                        {
                          ...product,
                          name: e.target.value,
                        },
                        index
                      )
                    }
                  ></input>
                </td>
                <td>{product.category_name}</td>
                <td style={{ textAlign: "center" }}>
                  <input
                    style={{ textAlign: "center" }}
                    value={product.price}
                    onChange={(e) =>
                      onChangeDataInCache(
                        {
                          ...product,
                          price: e.target.value,
                        },
                        index
                      )
                    }
                  ></input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <select
                    value={product.sale}
                    onChange={(e) =>
                      onChangeDataInCache(
                        {
                          ...product,
                          sale: e.target.value,
                        },
                        index
                      )
                    }
                  >
                    <option value={10}>10%</option>
                    <option value={20}>20%</option>
                    <option value={30}>30%</option>
                    <option value={40}>40%</option>
                    <option value={50}>50%</option>
                    <option value={60}>60%</option>
                    <option value={70}>70%</option>
                    <option value={80}>80%</option>
                    <option value={90}>90%</option>
                  </select>
                </td>
                <td style={{ textAlign: "center" }}>{product.total_buyturn}</td>
                <td
                  className="action"
                  style={{
                    position: "relative",
                    backgroundColor: "aliceblue",
                    zIndex: "20",
                  }}
                >
                  <HiOutlineEye
                    className="icon edit"
                    onClick={() => {
                      setIsOpenModalProduct(true);
                      setProductView(product);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <div
          className="glass_effect"
          style={{
            borderRadius: "10px",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: !isEdit ? "10" : "-10",
            cursor: "not-allowed",
          }}
        ></div>
      </table>
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "right",
          gap: "20px",
          zIndex: "20",
        }}
      >
        <button
          onClick={() => setPageSearch((prev) => (prev === 1 ? 1 : prev - 1))}
        >
          Trái
        </button>
        <button onClick={() => setPageSearch((prev) => prev + 1)}>Phải</button>
      </div>
      <ModalProduct
        getProduct={getProduct}
        productView={productView}
        isOpenModalProduct={isOpenModalProduct}
        setIsOpenModalProduct={setIsOpenModalProduct}
      />
    </>
  );
}
