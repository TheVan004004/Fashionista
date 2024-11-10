import Advertise from "../components/Advertise";
import Banner from "../components/Banner";
import Discount from "../components/Discount";
import Popular from "../components/popular";
import '../styles/homepage.css'
const HomePage = () => {
    return (
        <>
            <Banner />
            <Discount />
            <Popular />
            <div className="container-ads">
                <Advertise />
                <div style={{ display: "flex", gap: "1vw" }}>
                    <Advertise className="sub1" />
                    <Advertise className="sub2" />
                </div>
                <button className="search">Tìm kiếm sản phẩm ngay</button>
            </div>
        </>
    )
}

export default HomePage;