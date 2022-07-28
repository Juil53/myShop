import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { LOADING_STATUS, POPUP, USER_ACTIONS } from "../../../constants";
import { actions } from "../../../store/page/slice";
import { utils } from "../../../utils";
import { constant } from "../../../constants";
import { selectCart } from "../../../store/cart/selectors";
import { actions as cartActions } from "../../../store/cart/slice";
import localStorage from "../../../service/localStorage";
import Loading from "../../../components/loading/Loading";
import LoadingFail from "../../../components/loading_fail/LoadingFail";
import { addOrder, orderAddress } from "../../../store/orders/selector";
import { clientData } from "../../../store/clients/selector";
import {
  addOrderRequest,
  setOrderAddress,
} from "../../../store/orders/orderSlice";
import "react-toastify/dist/ReactToastify.css";
import Image from "../../../components/image/Image";

const Payment = () => {
  const currentAddress = useSelector(orderAddress);
  const [click, setClick] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState();

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const cart = useSelector(selectCart);
  const client = useSelector(clientData);
  const token = localStorage.get("token");

  const order = useSelector(addOrder);

  const [shippingFee, setShippingFee] = useState(10000);
  const [discount, setDiscount] = useState(0);

  //calculate amount
  const calAmount = (notional, shipping, discount) => {
    return parseInt(notional) + parseInt(shipping) - parseInt(discount);
  };

  const [amount, setAmount] = useState(0);

  const [isShowProducts, setIsShowProduct] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    if (cart.status === LOADING_STATUS.IDLE) {
      dispatch(cartActions.fetchCartRequest());
    }

    if (token && client.status === LOADING_STATUS.IDLE) {
      dispatch({ type: USER_ACTIONS.GET_USER_INFO });
    }
  }, [cart.status]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (order.status === LOADING_STATUS.LOADING && click) {
      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));
    } else if (order.status === LOADING_STATUS.SUCCESS && click) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
      setClick(false);
    }
  }, [order.status]);

  //set delivery address when user signed in
  useEffect(() => {
    if (token && client.status === LOADING_STATUS.SUCCESS) {
      const { addressList } = client.info;

      if (addressList && addressList.length > 0) {
        const defaultAddress = addressList.find((v) => v.default);

        dispatch(setOrderAddress(defaultAddress));
      }
    }
    setDeliveryAddress(currentAddress.address);
  }, [client.status, token]);

  useEffect(() => {
    //set delivery address
    setDeliveryAddress(currentAddress.address);

    //calculate amount
    setAmount(calAmount(cart.data.totalAmount, shippingFee, discount));
  });

  //actions
  const changePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handleShowProducts = () => {
    if (isShowProducts) {
      return setIsShowProduct(false);
    }
    return setIsShowProduct(true);
  };

  const handleChangeAddress = () => {
    dispatch(
      actions.activePopup({
        type: POPUP.CHOOSE_ADDRESS_POPUP,
        data: { currentAddress: deliveryAddress },
      })
    );
  };

  //render product list, product list of order
  const createOptionItem = (data) => {
    if (data && data.length && data.length > 0) {
      return data.map((v, i) => <span key={"option" + i}> {v} </span>);
    }
  };

  const renderProducts = (data) => {
    if (data && data.length > 0) {
      return data.map((v) => (
        <div className="product-item row" key={v.cartItemID}>
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
          <div className="price">{utils.priceBreak(v.priceAfterDiscount)}₫</div>
        </div>
      ));
    }
  };

  const renderProductsDropdown = (data) => {
    if (data && data.length > 0) {
      return data.map((v) => (
        <div className="product row" key={v.cartItemID}>
          <span>{v.quantity}x</span>
          <div className="name">{v.name}</div>
          <div className="price">{utils.priceBreak(v.priceAfterDiscount)}₫</div>
        </div>
      ));
    }
  };

  //order
  const handleOrder = () => {
    setClick(true);
    const error = document.querySelector(".order-infor__error");
    error.textContent = "";

    if (!deliveryAddress || Object.keys(deliveryAddress).length <= 0) {
      error.textContent = "Select delivery address";
    } else {
      const date =
        new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();

      const newOrder = {
        date: date,
        items: [...cart.data.productList],
        totalAmount: amount,
        notionalPrice: cart.data.totalAmount,
        shippingMethod: {
          shippingFee: shippingFee,
          shippingMethod: "",
        },
        status: constant.pending,
        deliveryAddress: deliveryAddress,
      };

      //payment method
      if (paymentMethod === "cash") {
        newOrder.payment = {
          name: "Cash(COD)",
          status: "Waiting for payment",
        };
      } else {
        newOrder.payment = {
          name: "Momo",
          status: "Waiting for payment",
        };
      }

      //Client info
      if (token) {
        newOrder.uid = client.info.id;
        newOrder.email = client.info.email;
      }

      dispatch(addOrderRequest({ order: newOrder }));
    }
  };

  const handleContinueShopping = () => {
    navigator("/product");
  };

  return (
    <>
      <ToastContainer />
      {cart.status === LOADING_STATUS.IDLE ||
      cart.status === LOADING_STATUS.LOADING ? (
        <Loading />
      ) : cart.status === LOADING_STATUS.FAIL ? (
        <LoadingFail />
      ) : cart.data?.productList && cart.data.productList.length > 0 ? (
        <div className="payment-page">
          <div className="title">Payment</div>
          <div className="content row">
            <div className="main">
              <div className="main__title">Products</div>
              <div className="main__content">
                {renderProducts(cart.data.productList)}
              </div>
            </div>
            <div className="sub">
              <div className="sub__section">
                <div className="sub__title">Delivery to</div>
                <div className="address">
                  {deliveryAddress &&
                  Object.keys(deliveryAddress).length > 0 ? (
                    <div className="address__info">
                      <div className="address__main-info row">
                        <div className="name">{deliveryAddress.name}</div>
                        <div className="phone">
                          {deliveryAddress.phoneNumber}
                        </div>
                      </div>
                      <div className="address__detail-info">
                        {deliveryAddress.address.detail +
                          " " +
                          deliveryAddress.address.ward.name +
                          " " +
                          deliveryAddress.address.district.name +
                          " " +
                          deliveryAddress.address.region.name}
                      </div>
                    </div>
                  ) : (
                    <div>Select address</div>
                  )}
                  <div className="address__function">
                    <button
                      className="button-style change-address-btn"
                      onClick={handleChangeAddress}
                    >
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
                      onChange={() => changePaymentMethod("momo")}
                      checked={paymentMethod === "momo"}
                      id="momo"
                    />
                    <label htmlFor="momo">Momo</label>
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
                      {renderProductsDropdown(cart.data.productList)}
                    </div>
                  </div>
                  <div className="order-info__price">
                    <div className="row price">
                      <div className="price__title">Notional price</div>
                      <div className="value">
                        {utils.priceBreak(cart.data.totalAmount)}₫
                      </div>
                    </div>
                    <div className="row price">
                      <div className="price__title">Transfer fee</div>
                      <div className="value">
                        {utils.priceBreak(shippingFee)}₫
                      </div>
                    </div>
                    <div className="row price discount">
                      <div className="price__title">Discount</div>
                      <div className="value">
                        -{utils.priceBreak(discount)}₫
                      </div>
                    </div>
                  </div>
                  <div className="order-infor__amount row">
                    <div className="price__title">Amount</div>
                    <div className="value">{utils.priceBreak(amount)}₫</div>
                  </div>
                  <div className="order-infor__error"></div>
                  <div className="order-infor__function">
                    <button
                      className="button-style order-btn"
                      onClick={handleOrder}
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="payment-page no-cart">
          <div className="no-cart__img">
            <img src="/img/empty_cart.png" alt="" />
          </div>
          <div className="no-cart__content">
            You have no product in your cart
          </div>
          <div className="no-cart__function">
            <button className="button-style" onClick={handleContinueShopping}>
              Continue shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
