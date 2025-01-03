import { Link } from "react-router-dom";
import Advertise from "../components/Advertise";
import Banner from "../components/banner";
import Discount from "../components/discount";
import Popular from "../components/popular";
import "../styles/pages/homepage.css";
const HomePage = () => {
  return (
    <div className="container_body">
      <Banner />
      <Discount />
      <Popular />
      <div className="container-ads">
        <Advertise />
        <div style={{ display: "flex", gap: "1vw" }}>
          <Advertise className="sub1" />
          <Advertise className="sub2" />
        </div>
        <Link to="/search">
          <button className="search">Tìm kiếm sản phẩm ngay</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
