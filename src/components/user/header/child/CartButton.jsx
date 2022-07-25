import { utils } from "../../../../utils";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../../image/Image";

const CartButton = (props) => {
  const { data } = props;

  const navigate = useNavigate();

  const createMoreInfo = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v) => <span key={v}>{v}</span>);
    }
  };

  const createProductList = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => (
        <div className="product-item row" key={"product_item" + v.id + i}>
          <div className="img">
            <Image src={v.image} showLoading />
          </div>
          <div className="info">
            <Link className="name" to={"/product/" + v.id}>
              {v.name}
            </Link>
            <div className="more-info">
              {Object.values(v.optionSelected) &&
                createMoreInfo(Object.values(v.optionSelected))}
            </div>
            <div className="price">
              {utils.priceBreak(v.priceAfterDiscount)}₫
            </div>
            <div className="quantity">
              Số lượng: <span>{v.quantity}</span>
            </div>
          </div>
        </div>
      ));
    }
  };

  const handlePayment = () => {
    navigate(`/payment`);
  };

  return (
    <div className="nav-btn cart-btn">
      <Link to="/cart">
        <i className="fa-solid fa-cart-shopping"></i>
      </Link>
      <span className="product-quantity">
        {data.productList && data.productList.length}
      </span>
      <div className="cart-dropdown-container">
        {data.productList && data.productList.length !== 0 ? (
          <div className="cart-dropdown-content">
            <div className="product-list">
              {createProductList(data.productList)}
            </div>
            <div className="sum row">
              <div className="title">Total money: </div>
              <div className="total-money">
                {utils.priceBreak(data.totalAmount)}₫
              </div>
            </div>
            <div className="payment-btn button-style" onClick={handlePayment}>
              Payment
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="img">
              <img src="/img/empty_cart.png" alt="" />
            </div>
            <div className="text">Your cart is empty</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartButton;
