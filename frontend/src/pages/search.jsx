import { useContext, useEffect, useState } from "react";
import Filter from "../components/Filter";
import Popular2 from "../components/popular_2";
import Product from "../product/product";
import '../styles/search.css'
import { MainContext } from "../context/main.context";
import { getAllProductsAPI } from "../services/services";
import empty from '../access/empty.png'
const Search = () => {
    const { listResult, setListResult, setSort, listPopular, inputSearch, isSearch, setIsSearching } = useContext(MainContext)
    const [listInit, setListInit] = useState([])
    useEffect(() => {
        getAllProduct()
        window.scrollTo({ top: 0 })
    }, [])
    const getAllProduct = async () => {
        const res = await getAllProductsAPI()
        const data = await res.data
        setListInit(data)
    }
    const [sortInput, setSortInput] = useState("");
    const handleSort = (value) => {
        setSortInput(value)
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
    }
    return (
        <div id="search">
            <Filter />
            <div className="main-content-search">
                {
                    isSearch
                        ?
                        <>
                            <div className="header-search">
                                <h2>Kết quả tìm kiếm:</h2>
                                <div className="sort-dropdown">
                                    <label htmlFor="sort">Sắp xếp theo:</label>
                                    <select id="sort"
                                        value={sortInput}
                                        onChange={(e) => {
                                            handleSort(e.target.value)
                                        }}
                                    >
                                        <option>Bán chạy</option>
                                        <option>Thấp đến cao</option>
                                        <option>Cao đến thấp</option>
                                        <option>Sale</option>
                                    </select>

                                </div>
                            </div>
                            {
                                listResult.length > 0
                                    ?
                                    <div className="product-list">
                                        {
                                            listResult.map((product, index) => {
                                                return (
                                                    <Product product={product} key={product.id * product.price * index} />
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div style={{ paddingTop: "40px", textAlign: "center" }}>
                                        <img style={{ width: "300px", height: "300px" }} src={empty} alt="" />
                                        <h3>Không tìm thấy sản phẩm phù hợp</h3>
                                    </div>
                            }

                        </>
                        :
                        <>
                            <Popular2 />
                            <div className="product-list">
                                {
                                    listInit.map((product, index) => {
                                        return (
                                            <Product product={product} key={product.id * product.price} />
                                        )
                                    })
                                }
                            </div>
                            <button className="view-more">Xem thêm</button>
                        </>

                }

            </div>
        </div>
    )
}

export default Search;