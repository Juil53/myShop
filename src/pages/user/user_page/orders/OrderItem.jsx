import { useNavigate } from "react-router-dom";
import Image from "../../../../components/image/Image";
import { utils } from "../../../../utils";

const OrderItem = ({ data }) => {
  const navigator = useNavigate();

  const createOptionItem = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => <span key={"option" + i}> {v} </span>);
    }
  };

  const createProduct = (data) => {
    if (data && data.length > 0) {
      return data.map((v) => (
        <div className="product row" key={v.cartItemID}>
          <div className="img">
            <Image src={v.image} showLoading />
          </div>
          <div className="info row">
            <div className="name">{v.name}</div>
            {v.optionSelected && Object.keys(v.optionSelected)?.length > 0 && (
              <div className="more">
                Type: {createOptionItem(Object.values(v.optionSelected))}
              </div>
            )}
            <div className="quantity">x{v.quantity}</div>
          </div>
          <div className="price">{utils.priceBreak(v.totalPrice)}₫</div>
        </div>
      ));
    }
  };

  const handleViewDetail = (id) => {
    navigator(`/user/orders/view-detail?id=${id}`);
  };
  return (
    <div className="orders__item">
      <div className="item__status">{data.status}</div>
      <div className="item__products">{createProduct(data.items)}</div>
      <div className="item__amount">
        <span>Amount: </span> {utils.priceBreak(data.totalAmount)}₫
      </div>
      <div className="item__function">
        <button
          className="button-style more-button"
          onClick={() => handleViewDetail(data.id)}
        >
          More detail
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
