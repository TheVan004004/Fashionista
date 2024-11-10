import { useContext, useEffect, useState } from "react";
import Filter from "../components/Filter";
import Popular2 from "../components/popular_2";
import Product from "../product/product";
import '../styles/search.css'
import { MainContext } from "../context/main.context";
import { getAllProductsAPI } from "../services/services";
const Search = () => {
    const { listResult, setListResult, setSort, listPopular } = useContext(MainContext)
    const [listInit, setListInit] = useState([])
    useEffect(() => { getAllProduct() }, [])
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
                    listResult.length > 0
                        ?
                        <>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h2>Result: </h2>
                                <div className="sort-dropdown">
                                    <label htmlFor="sort">Sắp xếp theo:</label>
                                    <select id="sort"
                                        value={sortInput}
                                        onChange={(e) => {
                                            handleSort(e.target.value)
                                        }}
                                    >
                                        <option>Bán chạy</option>
                                        <option>Mới nhất</option>
                                        <option>Thấp đến cao</option>
                                        <option>Cao đến thấp</option>
                                        <option>Sale</option>
                                    </select>

                                </div>
                            </div>

                            <div className="product-list">
                                {
                                    listResult.map((product, index) => {
                                        return (
                                            <Product product={product} key={product.id * product.price * index} />
                                        )
                                    })
                                }
                            </div>
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