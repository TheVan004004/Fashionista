import { Link, useNavigate } from "react-router-dom"
import error from '../access/error.png'
const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div style={{
            paddingTop: "150px",
            textAlign: "center"
        }}>
            <img style={{ width: "350px", height: "350px" }} src={error} alt="" />
            <p style={{ fontSize: "24px" }}>
                Hình như có lỗi gì đó thì phải?
                Hãy trở lại <Link to={"/"}> trang chính </Link>
            </p>
        </div>
    )
}

export default ErrorPage