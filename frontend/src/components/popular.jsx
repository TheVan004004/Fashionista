import { useContext } from 'react';
import Product from '../product/product';
import { MainContext } from '../context/main.context';

const Popular = () => {
    const { listPopular } = useContext(MainContext)
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
                    {listPopular.map((product, index) => {
                        if (index < 5) return (
                            <Product product={product} key={product.id * product.price} />
                        )
                        else return (<></>)
                    })
                    }
                </div>
                <button className="view-more">Xem thêm</button>
            </div>

        </>
    )
}

export default Popular;