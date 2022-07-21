import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { LOADING_STATUS } from "../../../../constants";
import { getOrderByClientRequest } from "../../../../store/orders/orderSlice";

import { orderById } from "../../../../store/orders/selector";
import { utils } from "../../../../utils";

const OrderDetail = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();

  const order = useSelector(orderById);

  useEffect(() => {
    // if (order.status == LOADING_STATUS.IDLE && params.get("id")) {
    //   dispatch(getOrderByClientRequest({ id: params.get("id") }));
    // }
  }, [params]);
  useEffect(() => {
    console.log(order);
  });
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
        <table>
          <thead className="table__header">
            <tr>
              <th className="product-info">Product</th>
              <th className="product-price">Price</th>
              <th className="product-quantity">Quantity</th>
              <th className="product-notional">Notional price</th>
            </tr>
          </thead>
          <tbody className="table__body">
            <tr className="product">
              <td className="row product-info">
                <div className="img">
                  <img src="/img/sp1.png" alt="" />
                </div>
                <div className="name">
                  Bàn phím không dây Bluetooth Logitech K380 - Kết nối 3 thiết
                  bị, giảm ồn, gọn nhẹ dễ mang đi, phù hợp Mac/ PC/ Laptop/ Điện
                  thoại - Màu trắng - Hàng chính hãng
                </div>
              </td>
              <td className="product-price">{utils.priceBreak(100000)}₫</td>
              <td className="product-quantity">2</td>
              <td className="product-notional">{utils.priceBreak(200000)}₫</td>
            </tr>
          </tbody>
        </table>
        <div className="price-container row">
          <div className="price notional row">
            <div className="price__title">Notional price: </div>
            <div className="price__value">{utils.priceBreak(200000)}₫</div>
          </div>
          <div className="price shipping row">
            <div className="price__title">Shipping fee: </div>
            <div className="price__value">{utils.priceBreak(10000)}₫</div>
          </div>
          <div className="price amount row">
            <div className="price__title">Amount: </div>
            <div className="price__value">{utils.priceBreak(210000)}₫</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
