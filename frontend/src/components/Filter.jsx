import { useContext, useEffect, useState } from 'react';
import '../styles/filter.css'
import { MainContext } from '../context/main.context';
import Color from './Color';
import Size from './Size';
import { HiAdjustments, HiOutlineXCircle } from 'react-icons/hi';
const Filter = () => {
    const { color, size, minPrice, maxPrice, setColor, setSize, setMinPrice, setMaxPrice } = useContext(MainContext)
    const [active, setActive] = useState(true)
    useEffect(() => { })
    return (
        <>

            <HiAdjustments
                style={{
                    position: "fixed",
                    top: "80px",
                    left: active ? "-100px" : "10px",
                    fontSize: "24px",
                    cursor: "pointer",
                    zIndex: "100",
                    padding: "5px",
                    color: "var(--background-color)",
                    backgroundColor: "var(--accent-color)",
                    borderRadius: "1000px",
                    transition: "ease-in-out 0.5s"
                }}
                onClick={() => setActive(true)}
            />


            <div id="filterSidebar" className={active ? "active" : ""}>
                <HiOutlineXCircle
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "10px",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                    onClick={() => setActive(false)}
                />
                <div className="filter-section">
                    <h4>Nhóm sản phẩm</h4>
                    <div className="filter-group">
                        <label><input type="checkbox" name="category" /> Quần áo nam</label>
                        <label><input type="checkbox" name="category" /> Quần áo nữ</label>
                    </div>
                </div >
                <div className="filter-section">
                    <h4>Khoảng giá (1.000đ) </h4>
                    <div className="filter-price">
                        <div className="price-inputs">
                            <input type="number" placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <span>-</span>
                            <input type="number" placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                        <div className="price-select">
                            <button
                                onClick={() => {
                                    setMaxPrice(100)
                                    setMinPrice(0)
                                }}
                            >Dưới 100</button>
                            <button
                                onClick={() => {
                                    setMaxPrice(200)
                                    setMinPrice(100)
                                }}
                            >100 - 200</button>
                            <button
                                onClick={() => {
                                    setMaxPrice(300)
                                    setMinPrice(200)
                                }}
                            >200 - 300</button>
                            <button
                                onClick={() => {
                                    setMinPrice(500)
                                    setMaxPrice(9999)
                                }}
                            >Trên 500 </button>
                        </div>
                    </div>

                </div>

                <div className="filter-section">
                    <h4>Kích cỡ</h4>
                    <div className="filter-size">
                        <Size sizeName="M" />
                        <Size sizeName="L" />
                        <Size sizeName="XL" />
                        <Size sizeName="2XL" />
                    </div>
                </div>
                <div className="filter-section">
                    <h4>Màu sắc</h4>
                    <div className="filter-color">
                        <Color colorName="Đỏ" type="" />
                        <Color colorName="Đen" type="" />
                        <Color colorName="Ghi" type="" />
                        <Color colorName="Trắng" type="" />
                    </div>
                </div>

            </div >
        </>
    )

}

export default Filter;