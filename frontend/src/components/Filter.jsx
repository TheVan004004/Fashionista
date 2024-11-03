import { useContext } from 'react';
import '../styles/filter.css'
import { MainContext } from '../context/main.context';
import Color from './Color';
import Size from './Size';
const Filter = () => {
    const { color, size, minPrice, maxPrice, setColor, setSize, setMinPrice, setMaxPrice } = useContext(MainContext)
    return (
        <>
            <div id="filterSidebar">
                <div className="filter-section">
                    <h4>Nhóm sản phẩm</h4>
                    <div className="filter-group">
                        <label><input type="checkbox" name="category" /> Quần áo nam</label>
                        <label><input type="checkbox" name="category" /> Quần áo nữ</label>
                    </div>
                </div >
                <div className="filter-section">
                    <h4>Khoảng giá (100.000đ) </h4>
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