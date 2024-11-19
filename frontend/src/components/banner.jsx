import { useState } from 'react';
import banner1 from '../access/banner/banner1.png'
import banner2 from '../access/banner/banner2.png'
import banner3 from '../access/banner/banner3.png'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const listBanner = [banner1, banner2, banner3, banner2];
    const toNext = () => {
        setCurrentIndex(index => {
            if (index === listBanner.length - 1) return 0;
            else return index + 1
        })
    }
    const toPrev = () => {
        setCurrentIndex(index => {
            if (index === 0) return listBanner.length - 1;
            else return index - 1
        })
    }

    return (
        <div id="container_banner">
            <div id="banner"
                style={{
                    translate: `-${100 * currentIndex}%`
                }}
            >
                {
                    listBanner.map((banner, index) => {
                        return (
                            <div
                                className={"container-img"}

                            >
                                <img src={banner} alt="" />
                            </div>
                        )

                    })
                }

                {
                    listBanner.map((banner, index) => {
                        return (
                            <div className={index === currentIndex && "active"} key={"banner" + index}

                            ></div>
                        )
                    })
                }
            </div>
            <div className="button_direct" >
                <button onClick={toPrev}><HiChevronLeft /></button>
                <button onClick={toNext}><HiChevronRight /></button>
            </div>
            <div className="banner_position">
                {
                    listBanner.map((_, index) => {
                        return (
                            <button className={index === currentIndex && "active"}
                                onClick={() => {
                                    setCurrentIndex(index)
                                    console.log("haha")
                                }}
                            >
                            </button>
                        )
                    })
                }
            </div>

        </ div>

    )
}

export default Banner