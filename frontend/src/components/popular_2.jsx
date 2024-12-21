import { useContext } from 'react';
import Product from '../product/product';
import { MainContext } from '../context/main.context';

const Popular_2 = () => {
    const { listPopular } = useContext(MainContext)
    return (
        <>
            <div id="popular" style={{ margin: "0" }}>
                <h3 >Sản phẩm ưa chuộng </h3>
                <div className="body">
                    {listPopular.map((product, index) => {
                        if (index < 5) return (
                            <Product product={product} key={"popular_" + product.id * product.price} type={"mini"} />
                        )
                        else return (<></>)
                    })
                    }
                </div>
                <hr />
            </div >

        </>
    )
}

export default Popular_2;