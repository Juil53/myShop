import { useState } from "react";
import OrderItem from "./OrderItem";

const Orders = () => {
  const [currentTab, setCurrentTab] = useState("all");

  const handleChangeTab = (tab, i) => {
    document.querySelector(
      ".orders__indicator"
    ).style.left = `calc(calc(100% / 4) * ${i})`;
    return setCurrentTab(tab);
  };

  return (
    <div className="orders">
      <div className="orders__title">Orders</div>
      <div className="orders__header row">
        <div
          className={
            currentTab === "all"
              ? "orders__header-button active"
              : "orders__header-button"
          }
          onClick={() => handleChangeTab("all", 0)}
        >
          All orders
        </div>
        <div
          className={
            currentTab === "pending"
              ? "orders__header-button active"
              : "orders__header-button"
          }
          onClick={() => handleChangeTab("pending", 1)}
        >
          Pending orders
        </div>
        <div
          className={
            currentTab === "successful"
              ? "orders__header-button active"
              : "orders__header-button"
          }
          onClick={() => handleChangeTab("successful", 2)}
        >
          Successful orders
        </div>
        <div
          className={
            currentTab === "canceled"
              ? "orders__header-button active"
              : "orders__header-button"
          }
          onClick={() => handleChangeTab("canceled", 3)}
        >
          Canceled orders
        </div>
      </div>
      <div className="orders__indicator"></div>
      <div className="orders__body">
        <OrderItem />
      </div>
    </div>
  );
};

export default Orders;
