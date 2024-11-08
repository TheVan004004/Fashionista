import Product from '../product/product';

const Popular_2 = () => {
    const product = {
        name: "chưa có name"
    }
    return (
        <>
            <div id="popular_2" >
                <h3 >Sản phẩm ưa chuộng </h3>
                <div className="body">
                    <Product product={product} />
                    <Product product={product} />
                    <Product product={product} />
                    <Product product={product} />
                </div>
                <hr />
            </div >

        </>
    )
}

export default Popular_2;