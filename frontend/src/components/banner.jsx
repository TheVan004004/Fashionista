import banner1 from '../access/banner/banner1.png'
import banner2 from '../access/banner/banner2.png'
import banner3 from '../access/banner/banner3.png'
const Banner = () => {
    return (
        <>
            <div id="banner">
                <div id="carousel">
                    <div className="container-img show">
                        <img src={banner1} alt="" />
                    </div>
                    <div className="container-img hidden">
                        <img src={banner2} alt="" />
                    </div>
                    <div className="container-img hidden">
                        <img src={banner3} alt="" />
                    </div>
                </div>
                {/* <div>
                    <div className="button-right">
                        <button

                            onClick={() => { }}
                        >
                            <img src="" alt="" />
                        </button>
                    </div>

                    <div className="button-left">
                        <button
                            onClick={() => { }}
                        >
                            <img src="" alt="" />
                        </button>
                    </div>
                </div> */}
            </div>

        </>

    )
}

export default Banner