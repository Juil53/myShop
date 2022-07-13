import { useEffect, useState } from "react";

import Address from "../../../components/address/Address";
import InputField from "../../../components/input_field/InputField";
import { utils } from "../../../utils";

const Payment = () => {
  const [address, setAddress] = useState({});
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [detail, setDetail] = useState();

  const [isShowProducts, setIsShowProduct] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const changePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handleShowProducts = () => {
    if (isShowProducts) {
      return setIsShowProduct(false);
    }
    return setIsShowProduct(true);
  };

  return (
    <div className="payment-page">
      <div className="title">Payment</div>
      <div className="content row">
        <div className="main">
          <div className="main__title">Products</div>
          <div className="main__content">
            <div className="product-item row">
              <div className="img">
                <img src="/img/sp1.png" alt="" />
              </div>
              <div className="info row">
                <div className="name">
                  Áo Bra Croptop Hai Dây Với Đệm Ngực Gợi Cảm Dành Cho Nữ -
                  TRẮNG ệm Ngực Gợi Cảm Dành Cho Nữ - TRẮNG
                </div>
                <div className="more">Type: đen</div>
                <div className="quantity">x2</div>
              </div>
              <div className="price">{utils.priceBreak(100000)}₫</div>
            </div>
            <div className="product-item row">
              <div className="img">
                <img src="/img/sp1.png" alt="" />
              </div>
              <div className="info row">
                <div className="name">
                  Áo Bra Croptop Hai Dây Với Đệm Ngực Gợi Cảm Dành Cho Nữ -
                  TRẮNG ệm Ngực Gợi Cảm Dành Cho Nữ - TRẮNG
                </div>
                <div className="more">Type: đen</div>
                <div className="quantity">x2</div>
              </div>
              <div className="price">{utils.priceBreak(100000)}₫</div>
            </div>
          </div>
        </div>
        <div className="sub">
          <div className="sub__section">
            <div className="sub__title">Delivery to</div>
            <div className="address">
              <div className="address__main-info row">
                <div className="name">Lê Ngọc Minh</div>
                <div className="phone">0392808994</div>
              </div>
              <div className="address__detail-info">
                Ký túc xá khu A đại học quốc gia TP Hồ Chí Minh, Phường Linh
                Trung, Quận Thủ Đức - TP Thủ Đức, Hồ Chí Minh
              </div>
              <div className="address__function">
                <button className="button-style change-address-btn">
                  Change
                </button>
              </div>
            </div>
          </div>
          <div className="sub__section">
            <div className="sub__title">Payment method</div>
            <div className="payment-method">
              <div className="method">
                <input
                  type="radio"
                  onChange={() => changePaymentMethod("cash")}
                  checked={paymentMethod === "cash"}
                  id="cash"
                />
                <label htmlFor="cash">Cash (COD)</label>
              </div>
              <div className="method">
                <input
                  type="radio"
                  onChange={() => changePaymentMethod("stripe")}
                  checked={paymentMethod === "stripe"}
                  id="stripe"
                />
                <label htmlFor="stripe">Stripe</label>
              </div>
            </div>
          </div>
          <div className="sub__section">
            <div className="sub__title">Order</div>
            <div className="order-info">
              <div className="order-info__products">
                <div className="product-dropdown__btn">
                  <span>1 product</span>
                  <div className="more-btn" onClick={handleShowProducts}>
                    More infomation{" "}
                    <i
                      className={
                        isShowProducts
                          ? "fa-solid fa-angle-up"
                          : "fa-solid fa-angle-down"
                      }
                    ></i>
                  </div>
                </div>
                <div
                  className={
                    isShowProducts
                      ? "product-dropdown__content active"
                      : "product-dropdown__content"
                  }
                >
                  <div className="product row">
                    <span>1x</span>
                    <div className="name">
                      Áo Bra Croptop Hai Dây Với Đệm Ngực Gợi Cảm Dành Cho Nữ -
                      TRẮNG ệm Ngực Gợi Cảm Dành Cho Nữ - TRẮNG
                    </div>
                    <div className="price">{utils.priceBreak(100000)}₫</div>
                  </div>
                </div>
              </div>
              <div className="order-info__price">
                <div className="row price">
                  <div className="price__title">Notional price</div>
                  <div className="value">{utils.priceBreak(100000)}₫</div>
                </div>
                <div className="row price">
                  <div className="price__title">Transfer fee</div>
                  <div className="value">{utils.priceBreak(10000)}₫</div>
                </div>
                <div className="row price discount">
                  <div className="price__title">Discount</div>
                  <div className="value">-{utils.priceBreak(10000)}₫</div>
                </div>
              </div>
              <div className="order-infor__amount row">
                <div className="price__title">Amount</div>
                <div className="value">{utils.priceBreak(100000)}₫</div>
              </div>
              <div className="order-infor__function">
                <button className="button-style order-btn">Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
