import { utils } from "../../../../utils";

const OrderItem = () => {
  return (
    <div className="orders__item">
      <div className="item__status">Delivery successful</div>
      <div className="item__products">
        <div className="product row">
          <div className="img">
            <img src="/img/sp1.png" alt="" />
          </div>
          <div className="info row">
            <div className="name">
              Áo Bra Croptop Hai Dây Với Đệm Ngực Gợi Cảm Dành Cho Nữ - TRẮNG ệm
              Ngực Gợi Cảm Dành Cho Nữ - TRẮNG
            </div>
            <div className="more">Type: đen</div>
            <div className="quantity">x2</div>
          </div>
          <div className="price">{utils.priceBreak(100000)}₫</div>
        </div>
      </div>
      <div className="item__function">
        <button className="button-style more-button">More detail</button>
      </div>
    </div>
  );
};

export default OrderItem;
