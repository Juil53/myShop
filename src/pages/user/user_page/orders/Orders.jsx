import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { constant, LOADING_STATUS } from "../../../../constants";
import localStorage from "../../../../service/localStorage";
import { getOrderByClientRequest } from "../../../../store/orders/orderSlice";
import { orderByClient } from "../../../../store/orders/selector";
import OrderItem from "./OrderItem";

const Orders = () => {
  const [currentTab, setCurrentTab] = useState(constant.all);
  const [currentData, setCurrentData] = useState([]);
  const dispatch = useDispatch();
  const orders = useSelector(orderByClient);
  const token = localStorage.get("token");

  useEffect(() => {
    if (orders.status === LOADING_STATUS.IDLE) {
      dispatch(getOrderByClientRequest());
    } else if (orders.status == LOADING_STATUS.SUCCESS) {
      setCurrentData(orders.data);
    }
  }, [orders.status]);

  useEffect(() => {
    if (currentTab === constant.all) {
      setCurrentData(orders.data);
    } else {
      filterOrder(currentTab, orders.data);
    }
  }, [currentTab]);

  const filterOrder = (status, data) => {
    if (data && data.length > 0) {
      const kq = data.filter((v) => v.status === status);
      setCurrentData(kq);
    }
  };

  const handleChangeTab = (tab, i) => {
    document.querySelector(
      ".orders__indicator"
    ).style.left = `calc(calc(100% / 4) * ${i})`;
    return setCurrentTab(tab);
  };

  const createCurrentData = (data) => {
    if (data) {
      if (data.length > 0) {
        return data.map((v) => <OrderItem key={v.id} data={v} />);
      } else {
        return <div className="orders__item">You have no order</div>;
      }
    }
  };

  return (
    <div className="orders">
      <div className="orders__title">Orders</div>
      <div className="orders__header row">
        <div
          className={
            currentTab === constant.all
              ? "orders__header-button active"
              : "orders__header-button"
          }
          onClick={() => handleChangeTab(constant.all, 0)}
        >
          All orders
        </div>
        <div
          className={
            currentTab === constant.pending
              ? "orders__header-button active"
              : "orders__header-button"
          }
          onClick={() => handleChangeTab(constant.pending, 1)}
        >
          Pending orders
        </div>
        <div
          className={
            currentTab === constant.successful
              ? "orders__header-button active"
              : "orders__header-button"
          }
          onClick={() => handleChangeTab(constant.successful, 2)}
        >
          Successful orders
        </div>
        <div
          className={
            currentTab === constant.canceled
              ? "orders__header-button active"
              : "orders__header-button"
          }
          onClick={() => handleChangeTab(constant.canceled, 3)}
        >
          Canceled orders
        </div>
      </div>
      <div className="orders__indicator"></div>
      {token && orders.status === LOADING_STATUS.SUCCESS && (
        <div className="orders__body">{createCurrentData(currentData)}</div>
      )}
    </div>
  );
};

export default Orders;
