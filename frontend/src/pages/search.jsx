import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Filter from "../components/Filter";
import Popular2 from "../components/popular_2";
import Product from "../product/product";
import "../styles/pages/search.css";
import { MainContext } from "../context/main.context";
import empty from "../access/empty.png";
import { getProductsAPI } from "../services/product.api";
const Search = () => {
  const {
    listResultSearch,
    setListResultSearch,
    setSort,
    listPopular,
    inputSearch,
    setInputSearch,
    isSearch,
    setIsSearching,
    pageSearch,
    setPageSearch,
    limitSearch,
    setLimitSearch,
    nextPageSearch,
    setNextPageSearch,
  } = useContext(MainContext);
  const [listInit, setListInit] = useState([]);
  const [sortInput, setSortInput] = useState("");
  const [limit, setLimit] = useState(16);
  const [nextPage, setNextPage] = useState(1);
  useEffect(() => {
    setIsSearching(false);
    window.scrollTo({ top: 0 });
    return () => {
      setInputSearch("");
      setIsSearching(false);
    };
  }, []);
  useEffect(() => {
    getProduct();
  }, [limit]);

  const getProduct = async () => {
    const res = await getProductsAPI({ page: 1, limit: limit });
    const data = res.data.data;
    setNextPage(data.pageInfo.nextPage);
    setListInit(data.products);
  };
  const handleSort = (value) => {
    setSortInput(value);
    switch (value) {
      case "Bán chạy":
        setSort("most_buyturn");
        break;
      case "Thấp đến cao":
        setSort("price_asc");
        break;
      case "Cao đến thấp":
        setSort("price_desc");
        break;
      case "Sale":
        setSort("sale_desc");
        break;
      default:
        break;
    }
  };
  return (
    <div id="search">
      <Filter />
      <div className="main-content-search">
        {isSearch ? (
          <>
            <div className="header-search">
              <h2>Kết quả tìm kiếm:</h2>
              <div className="sort-dropdown">
                <div style={{ textWrap: "nowrap" }}>Sắp xếp theo:</div>
                <select
                  value={sortInput}
                  onChange={(e) => {
                    handleSort(e.target.value);
                  }}
                >
                  <option>Bán chạy</option>
                  <option>Thấp đến cao</option>
                  <option>Cao đến thấp</option>
                  <option>Sale</option>
                </select>
              </div>
            </div>
            {listResultSearch.length > 0 ? (
              <div className="product-list">
                {listResultSearch.map((product, index) => {
                  return (
                    <Product
                      product={product}
                      key={product.id * product.price * index}
                    />
                  );
                })}
              </div>
            ) : (
              <div style={{ paddingTop: "40px", textAlign: "center" }}>
                <img
                  style={{ width: "300px", height: "300px" }}
                  src={empty}
                  alt=""
                />
                <h3>Không tìm thấy sản phẩm phù hợp</h3>
              </div>
            )}
            {/* {nextPageSearch && (
              <button
                className="view-more btn12"
                onClick={() => setLimitSearch((prev) => prev + 16)}
              >
                Xem thêm
              </button>
            )} */}
          </>
        ) : (
          <>
            <Popular2 />
            <div className="product-list">
              {listInit.map((product, index) => {
                return (
                  <Product product={product} key={product.id * product.price} />
                );
              })}
            </div>
            {nextPage && (
              <button
                className="view-more btn12"
                onClick={() => setLimit((prev) => prev + 16)}
              >
                Xem thêm
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
