import { useContext, useEffect, useState } from "react";
import "../styles/pages/filter.css";
import { MainContext } from "../context/main.context";
import Color from "./Color";
import Size from "./Size";
import {
  HiAdjustments,
  HiChevronDown,
  HiChevronUp,
  HiOutlineXCircle,
} from "react-icons/hi";
import { getAllColorAPI } from "../services/product.api";
const Filter = () => {
  const {
    color,
    size,
    minPrice,
    maxPrice,
    colorFilter,
    setColorFilter,
    setMinPrice,
    setMaxPrice,
    categories,
    categoryFilter,
    setCategoryFilter,
  } = useContext(MainContext);
  const [openFilter, setOpenFilter] = useState(true);
  const [listColor, setListColor] = useState([]);
  useEffect(() => {
    getColor();
  }, []);
  const [isViewMoreCategory, setIsViewMoreCategory] = useState(false);
  const getColor = async () => {
    const res = await getAllColorAPI();
    const data = await res.data.data;
    setListColor(data);
  };
  const removeFilter = async () => {
    setColorFilter("");
    setMinPrice("");
    setMaxPrice("");
    setCategoryFilter("");
  };
  return (
    <>
      <HiAdjustments
        style={{
          position: "fixed",
          top: "80px",
          left: openFilter ? "-100px" : "10px",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: "10",
          padding: "5px",
          color: "var(--background-color)",
          backgroundColor: "var(--accent-color)",
          borderRadius: "1000px",
          transition: "ease-in-out 0.5s",
        }}
        onClick={() => setOpenFilter(true)}
      />

      <div id="filterSidebar" className={openFilter ? "active" : ""}>
        <HiOutlineXCircle
          style={{
            position: "absolute",
            top: "20px",
            right: "10px",
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={() => setOpenFilter(false)}
        />
        <button
          style={{
            padding: "10px",
            width: "100px",
            backgroundColor: "var(--blur-color)",
          }}
          onClick={removeFilter}
        >
          Bỏ lọc
        </button>
        <div className="filter-section">
          <h4>Loại sản phẩm</h4>
          <div className="filter-group">
            {categories
              .slice(0, isViewMoreCategory ? categories.length : 5)
              .map((category, index) => {
                return (
                  <label>
                    <input
                      checked={category.name === categoryFilter}
                      type="radio"
                      name="category"
                      onClick={() =>
                        setCategoryFilter((prev) => {
                          console.log(prev);
                          return prev !== "" && prev === categoryFilter
                            ? ""
                            : category.name;
                        })
                      }
                    />{" "}
                    {category.name}
                  </label>
                );
              })}
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "var(--blur-color)",
              padding: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setIsViewMoreCategory((prev) => !prev)}
          >
            {isViewMoreCategory ? <HiChevronUp /> : <HiChevronDown />}
          </div>
        </div>
        <div className="filter-section">
          <h4>Khoảng giá (1.000đ) </h4>
          <div className="filter-price">
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="price-select">
              <button
                onClick={() => {
                  setMaxPrice(100);
                  setMinPrice(0);
                }}
              >
                Dưới 100
              </button>
              <button
                onClick={() => {
                  setMaxPrice(200);
                  setMinPrice(100);
                }}
              >
                100 - 200
              </button>
              <button
                onClick={() => {
                  setMaxPrice(300);
                  setMinPrice(200);
                }}
              >
                200 - 300
              </button>
              <button
                onClick={() => {
                  setMinPrice(500);
                  setMaxPrice(9999);
                }}
              >
                Trên 500{" "}
              </button>
            </div>
          </div>
        </div>

        {/* <div className="filter-section">
          <h4>Kích cỡ</h4>
          <div className="filter-size">
            <Size sizeName="M" />
            <Size sizeName="L" />
            <Size sizeName="XL" />
            <Size sizeName="2XL" />
          </div>
        </div> */}
        <div className="filter-section">
          <h4>Màu sắc</h4>
          <div className="filter-color">
            {listColor.map((color, index) => {
              return <Color color={color} key={color.hex_code} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
