import '../styles/footer.css'
const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <h3>Dịch vụ khách hàng</h3>
                        <ul>
                            <li><a href="#">Chính sách khách hàng thân thiết</a></li>
                            <li><a href="#">Chính sách đổi trả</a></li>
                            <li><a href="#">Chính sách bảo mật</a></li>
                            <li><a href="#">Chính sách sử dụng Cookies</a></li>
                            <li><a href="#">Chính sách thanh toán, giao nhận</a></li>
                            <li><a href="#">Chính sách đơn đồng phục</a></li>
                            <li><a href="#">Hướng dẫn chọn size</a></li>
                            <li><a href="#">Đăng ký đối tác</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Về YODY</h3>
                        <ul>
                            <li><a href="#">Giới thiệu</a></li>
                            <li><a href="#">Liên hệ</a></li>
                            <li><a href="#">Tuyển dụng</a></li>
                            <li><a href="#">Tin tức</a></li>
                            <li><a href="#">Hệ thống cửa hàng</a></li>
                            <li><a href="#">Tin khuyến mãi</a></li>
                        </ul>
                        <h3>Địa chỉ liên hệ</h3>
                        <p>Địa chỉ: Đường An Định - Phường Việt Hòa - Thành phố Hải Dương</p>
                    </div>

                    <div className="footer-section">
                        <h3>YODY lắng nghe bạn</h3>
                        <p>Chúng tôi luôn trân trọng và mong đợi mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải
                            nghiệm dịch vụ và sản phẩm tốt hơn nữa.</p>
                        <p><strong>Liên hệ đặt hàng</strong><br />024 999 86 999</p>
                        <p><strong>Góp ý khiếu nại</strong><br />1800 2086</p>
                        <p><strong>Email</strong><br />chamsockhachhang@yody.vn</p>
                        <div className="social-icons">
                            <a href="#"><img src="./asset/css/image/icons8-facebook.svg" alt="Facebook" /></a>
                            <a href="#"><img src="./asset/css/image/icons8-insta.svg" alt="Instagram" /></a>
                            <a href="#"><img src="./asset/css/image/icons8-zalo-48.svg" alt="Zalo" /></a>
                            <a href="#"><img src="./asset/css/image/icons8-insta.svg" alt="YouTube" /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;