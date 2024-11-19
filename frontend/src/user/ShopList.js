
const ShopList = () => {

  return (
    <>
      <div className="title">
        <p>Tất cả</p>
        <p>Chờ thanh toán</p>
        <p>Vận chuyển</p>
        <p>Hoàn thành</p>
        <p>Đã hủy</p>
      </div>
      <div className="body">
        <div>
          <img src={`${process.env.PUBLIC_URL}/img/completed-task.png`} alt="My Image" />
        </div>
        <div className="text">Chưa có đơn hàng nào</div>
      </div>
    </>

  )
}
export default ShopList