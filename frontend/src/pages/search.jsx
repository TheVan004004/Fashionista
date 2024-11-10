import { useContext } from "react";
import Filter from "../components/Filter";
import Popular2 from "../components/popular_2";
import Product from "../product/product";
import '../styles/search.css'
import { MainContext } from "../context/main.context";
const Search = () => {
    const { listResult, setListResult, } = useContext(MainContext)
    const product = {
        name: "Chưa có name",
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
                                    <select id="sort">
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
                                            <Product product={product} key={product.id} />
                                        )
                                    })
                                }
                            </div>
                        </>
                        :
                        <>
                            <Popular2 />
                            <div className="sort-dropdown">
                                <label htmlFor="sort">Sắp xếp theo:</label>
                                <select id="sort">
                                    <option>Bán chạy</option>
                                    <option>Mới nhất</option>
                                    <option>Thấp đến cao</option>
                                    <option>Cao đến thấp</option>
                                    <option>Sale</option>
                                </select>
                            </div>
                            <div className="product-list">
                                <Product product={product} />
                                <Product product={product} />
                                <Product product={product} />
                                <Product product={product} />
                            </div>
                            <button className="view-more">Xem thêm</button>
                        </>

                }

            </div>
        </div>
    )
}

export default Search;