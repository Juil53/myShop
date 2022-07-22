import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import LoadingFail from "../../../../components/loading_fail/LoadingFail";
import { LOADING_STATUS } from "../../../../constants";
import {
  getOrderByClientRequest,
  getOrderByIdRequest,
} from "../../../../store/orders/orderSlice";

import { orderById } from "../../../../store/orders/selector";
import { utils } from "../../../../utils";

const OrderDetail = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();

  const order = useSelector(orderById);

  useEffect(() => {
    if (params.get("id")) {
      dispatch(getOrderByIdRequest({ id: params.get("id") }));
    }
  }, [params]);

  useEffect(() => {
    console.log(order);
  });

  const createProduct = (data) => {
    if (data && data.length > 0) {
      return data.map((v) => (
        <tr className="product" key={v.cartItemID}>
          <td className="row product-info">
            <div className="img">
              <img src={v.image} alt="" />
            </div>
            <div className="name">{v.name}</div>
          </td>
          <td className="product-price">
            {utils.priceBreak(v.priceAfterDiscount)}₫
          </td>
          <td className="product-quantity">{v.quantity}</td>
          <td className="product-notional">
            {utils.priceBreak(v.totalPrice)}₫
          </td>
        </tr>
      ));
    }
  };

  const createOrderDetail = ({
    data: {
      date,
      id,
      status,
      deliveryAddress,
      items,
      payment,
      shippingMethod,
      totalAmount,
      notionalPrice,
    },
  }) => {
    if (
      date &&
      id &&
      status &&
      deliveryAddress &&
      items &&
      payment &&
      shippingMethod &&
      totalAmount &&
      notionalPrice
    ) {
      return (
        <div className="order-detail__container">
          <div className="order-detail__title">
            Order detail <span>#{id}</span>
            <span> - {status}</span>
          </div>
          <div className="order-detail__top">
            <div className="container date">Ngày đặt hàng: {date}</div>
            <div className="container info row">
              <div className="info__section">
                <div className="section__title">Delivery address</div>
                <div className="section__content">
                  <div className="name">Name: {deliveryAddress.name}</div>
                  <div className="address">
                    Address: {deliveryAddress.address.detail},{" "}
                    {deliveryAddress.address.ward.name},{" "}
                    {deliveryAddress.address.district.name},{" "}
                    {deliveryAddress.address.region.name}
                  </div>
                  <div className="phone">
                    Phone number: {deliveryAddress.phoneNumber}
                  </div>
                </div>
              </div>
              <div className="info__section">
                <div className="section__title">Payment method</div>
                <div className="section__content">{payment.name}</div>
              </div>
            </div>
          </div>
          <div className="order-detail__main">
            <table>
              <thead className="table__header">
                <tr>
                  <th className="product-info">Product</th>
                  <th className="product-price">Price</th>
                  <th className="product-quantity">Quantity</th>
                  <th className="product-notional">Notional price</th>
                </tr>
              </thead>
              <tbody className="table__body">{createProduct(items)}</tbody>
            </table>
            <div className="price-container row">
              <div className="price notional row">
                <div className="price__title">Notional price: </div>
                <div className="price__value">
                  {utils.priceBreak(notionalPrice)}₫
                </div>
              </div>
              <div className="price shipping row">
                <div className="price__title">Shipping fee: </div>
                <div className="price__value">
                  {utils.priceBreak(shippingMethod.shippingFee)}₫
                </div>
              </div>
              <div className="price amount row">
                <div className="price__title">Amount: </div>
                <div className="price__value">
                  {utils.priceBreak(totalAmount)}₫
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      {order.status === LOADING_STATUS.LOADING ? (
        <Loading />
      ) : order.status === LOADING_STATUS.SUCCESS ? (
        createOrderDetail(order)
      ) : (
        <LoadingFail />
      )}
    </>
  );
};

export default OrderDetail;
