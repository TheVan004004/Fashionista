
import { useContext } from 'react';
import ProductDiscount from '../product/product.discount';
import { MainContext } from '../context/main.context';
import CountDownTime from './CountDownTime';
const Discount = () => {
    const { listBestSaler } = useContext(MainContext)
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

                        <CountDownTime />
                    </div>
                </div>
                <div className="body">
                    {
                        listBestSaler.map((product, index) => {
                            if (index < 5) return (
                                <ProductDiscount product={product} key={"discount_" + product.id * product.price} />
                            )
                            else return (<></>)
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Discount;