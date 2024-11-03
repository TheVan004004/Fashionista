import Product from '../product/product';

const Popular = () => {
    const product = {
        name: "Chưa có name",
    }
    return (
        <>
            <div id="popular" >
                <div className="title" >Sản phẩm ưa chuộng </div>
                <div className="select">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                </div>
                <div className="body">
                    <Product product={product} />
                    <Product product={product} />
                    <Product product={product} />
                    <Product product={product} />
                </div>
                <button className="view-more">Xem thêm</button>
            </div>

        </>
    )
}

export default Popular;