const CURRENT_USERS = 2;
const CURRENT_PRODUCTS = 20;
const CURRENT_ORDERS = 9;
const CURRENT_REVENUE = 1000000;
const month = new Date().getMonth() + 1;
const day = new Date().getDate();

export const handleNewItem = (data) => {
  const newItemThisMonth = [];

  data?.forEach((item, index) => {
    const itemCreatedAt = new Date(item.timeStamp).getMonth() + 1;
    if (itemCreatedAt === month) {
      newItemThisMonth.push(item);
    }
  });
  return newItemThisMonth.length;
};

export const handleRevenue = (orders) => {
  const ordersThisMonth = [];
  const ordersThisDay = [];
  const revenue = {
    month: 0,
    day: 0,
  };

  //convert order date str to Date
  const convertedOrder = orders.map((order) => {
    return { ...order, date: new Date(order.date) };
  });

  convertedOrder.forEach((order) => {
    const orderCreatedAtMonth = order.date.getMonth() + 1;
    const orderCreatedAtDate = order.date.getDate();
    orderCreatedAtMonth === month && ordersThisMonth.push(order);
    orderCreatedAtDate === day && ordersThisDay.push(order);
  });

  //Revenue
  revenue.month = ordersThisMonth.reduce(
    (total, order, index) => total + order.totalAfterDiscount,
    0
  );
  revenue.day = ordersThisDay.reduce((total, order, index) => total + order.totalAfterDiscount, 0);
  return revenue;
};

export const handleSixMonthData = (data, thisMonth) => {
  data.splice(0, 1);
  data.splice(data.length, 0, thisMonth);
  return data;
};

export const handleIncreaseItem = (newItems) => (newItems / CURRENT_USERS) * 100;
export const handleIncreaseProducts = (newItems) => (newItems / CURRENT_PRODUCTS) * 100 + `%`;
export const handleIncreaseOrders = (newItems) => (newItems / CURRENT_ORDERS) * 100 + `%`;
export const handleIncreaseRevenue = (newItems) =>
  Math.round(((newItems - CURRENT_REVENUE) / CURRENT_REVENUE) * 100);
