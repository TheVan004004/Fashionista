import { useContext, useEffect, useState } from "react";
import Product from "../product/product";
import { MainContext } from "../context/main.context";
import { getProductPopularByCategoryAPI } from "../services/product.api";
import { useNavigate } from "react-router-dom";

const Popular = () => {
  const {
    categories,
    setCategories,
    inputSearch,
    setInputSearch,
    setCategoryFilter,
  } = useContext(MainContext);
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState(categories[0]?.name);
  const [listPopular, setListPopular] = useState([]);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    getProductPopularByCategory();
  }, [categoryName]);
  const getProductPopularByCategory = async () => {
    const res = await getProductPopularByCategoryAPI(categoryName, limit);
    setListPopular(res.data.data);
  };
  const searchMore = async () => {
    setCategoryFilter(categoryName);
    navigate("/search");
  };
  return (
    <>
      <div id="popular">
        <div className="title">Sản phẩm ưa chuộng </div>
        <div className="select">
          {categories.slice(0, 5).map((category, index) => {
            return (
              <button
                key={category.name}
                onClick={() => setCategoryName(category.name)}
                className={
                  category.name === categoryName ? "active_button" : ""
                }
              >
                {category.name}
              </button>
            );
          })}
        </div>
        <div className="body">
          {listPopular.map((product, index) => {
            return (
              <Product
                product={product}
                key={"popular_" + product.id + index}
              />
            );
          })}
        </div>
        <button className="view-more" onClick={searchMore}>
          Tìm kiếm thêm
        </button>
      </div>
    </>
  );
};

export default Popular;
