
import ProductDiscount from '../product/product.discount';
const Discount = () => {
    return (
        <>
            <div id="discount">
                <div className="header">
                    <div className="left">
                        <p style={{ fontSize: "32px", fontWeight: "600" }}>Sale 20%</p>
                        <p >Toàn bộ sản phẩm nữ</p>
                    </div>

                    <div className="right">
                        <div >Kết thúc sau</div>
                        <div className="tooltip">
                            <div>00</div>
                        </div>
                        :
                        <div className="tooltip">00</div>
                        :
                        <div className="tooltip">00</div>
                    </div>
                </div>
                <div className="body">
                    <ProductDiscount />
                    <ProductDiscount />
                    <ProductDiscount />
                    <ProductDiscount />
                    <ProductDiscount />
                </div>
            </div>
        </>
    )
}

export default Discount;