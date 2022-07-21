const OrderDetail = () => {
  return (
    <div className="order-detail__container">
      <div className="order-detail__title">
        Order detail <span>#Order ID</span>
        <span> - Cancel</span>
      </div>
      <div className="order-detail__top">
        <div className="container date">Ngày đặt hàng: </div>
        <div className="container info row">
          <div className="info__section">
            <div className="section__title">Delivery address</div>
            <div className="section__content">
              <div className="name">Name: Ngọc Minh</div>
              <div className="address">
                Address: Ký túc xá khu A đại học quốc gia thành phố Hồ Chí Minh
              </div>
              <div className="phone">Phone number: 0392808994</div>
            </div>
          </div>
          <div className="info__section">
            <div className="section__title">Payment method</div>
            <div className="section__content">
              Thanh toán tiền mặt khi nhận hàng
            </div>
          </div>
        </div>
      </div>
      <div className="order-detail__main">
        <table></table>
      </div>
    </div>
  );
};

export default OrderDetail;
