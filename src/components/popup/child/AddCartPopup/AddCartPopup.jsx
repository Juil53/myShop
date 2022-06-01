import { utils } from "../../../../utils";
import Quantity from "../../../quantity/Quantity";

const AddCartPopup = (props) => {
  const { closePopup, data } = props;
  return (
    <div className="modal center">
      <div className="popup-add-cart">
        <div className="add-cart__title row">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="cart-info row">
          <span>{data.name}</span> added to your cart
        </div>
        <div className="cart-status">
          <span>1</span> products in your cart
        </div>
        <div className="add-cart__content">
          <div className="product-header row">
            <div className="title product-info">Product</div>
            <div className="title price">Price</div>
            <div className="title quantity">Quantity</div>
            <div className="title amount">Amount</div>
          </div>
          <div className="product-list">
            <div className="item row">
              <div className="data product-info row">
                <div className="img">
                  <img src="/img/sp1.png" alt="" />
                </div>
                <div className="name">
                  Giày tây nâu đỏ thương hiệu Converse on star
                </div>
              </div>
              <div className="data price">{utils.priceBreak(500000)}₫</div>
              <div className="data quantity">
                <Quantity value="2" quantity="10" />
              </div>
              <div className="data amount">{utils.priceBreak(1000000)}₫</div>
              <div className="delete-btn">
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
            <div className="item row">
              <div className="data product-info row">
                <div className="img">
                  <img src="/img/sp1.png" alt="" />
                </div>
                <div className="name">
                  Giày tây nâu đỏ thương hiệu Converse on star
                </div>
              </div>
              <div className="data price">{utils.priceBreak(500000)}₫</div>
              <div className="data quantity">
                <Quantity value="2" quantity="10" />
              </div>
              <div className="data amount">{utils.priceBreak(1000000)}₫</div>
              <div className="delete-btn">
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="add-cart__footer row">
          <div className="back-btn" onClick={closePopup}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="total-money">
            Total money: <span>{utils.priceBreak(1000000)}₫</span>
          </div>
        </div>
        <div className="order-container">
          <button className="button-style order-btn">Order</button>
        </div>
        <div className="popup__cancel-btn round" onClick={closePopup}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default AddCartPopup;
