const CURRENT_USERS = 2;
const CURRENT_PRODUCTS = 20;
const CURRENT_ORDERS = 1;
const CURRENT_REVENUE = 150000;
const CURRENT_MONTH = new Date().getMonth() + 1;

export const handleNewItem = (data, option) => {
  const newItemThisMonth = [];

  data?.forEach((item, index) => {
    const itemCreatedAt = new Date(item.timeStamp).getMonth() + 1;
    if (option !== 0 && itemCreatedAt === option) {
      newItemThisMonth.push(item);
    } else if (!option && itemCreatedAt === CURRENT_MONTH) {
      newItemThisMonth.push(item);
    }
  });
  return newItemThisMonth.length;
};

export const handleNewOrders = (data, option) => {
  const newItemThisMonth = [];

  data?.forEach((item, index) => {
    const itemCreatedAt = new Date(item.date).getMonth() + 1;
    if (option !== 0 && itemCreatedAt === option) {
      newItemThisMonth.push(item);
    } else if (!option && itemCreatedAt === CURRENT_MONTH) {
      newItemThisMonth.push(item);
    }
  });
  return newItemThisMonth.length;
};

export const handleRevenue = (orders, month) => {
  const ordersThisMonth = [];
  const revenue = {
    month: 0,
    date: [],
  };

  //convert order date str to Date
  const convertedOrder = orders.map((order) => {
    return { ...order, date: new Date(order.date) };
  });

  convertedOrder.forEach((order) => {
    const orderCreatedAtMonth = order.date.getMonth() + 1;
    if (month !== 0 && orderCreatedAtMonth === month) {
      ordersThisMonth.push(order);
    } else if (!month && orderCreatedAtMonth === CURRENT_MONTH) {
      ordersThisMonth.push(order);
    }
  });

  const sortedOrders = ordersThisMonth.sort((a, b) => Number(a.date) - Number(b.date));

  //Daily Revenue
  sortedOrders.forEach((order) => {
    const date = order.date.getDate();
    if (order.status === "Successful") {
      revenue.date.push({ date, revenue: order.totalAmount });
    }
  });

  //Month Revenue
  const successOrdersMonth = ordersThisMonth.filter(order=>order.status === "Successful")
  revenue.month = successOrdersMonth.reduce((total, order, index) => total + order.totalAmount, 0);  
  return revenue;
};

export const handleSixMonthData = (data, thisMonth) => {
  data.splice(0, 1);
  data.splice(data.length, 0, thisMonth);
  return data;
};

export const handleDateOfMonth = (month) => {
  const dt = new Date();
  const year = dt.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  const date = [];
  for (let i = 0; i < daysInMonth; i++) {
    date.push(i + 1);
  }
  return date;
};

export const handleConvertNumberToMonth = (number) => {
  switch (number) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      break;
  }
};

export const handleIncreaseItem = (newItems) => (newItems / CURRENT_USERS) * 100;
export const handleIncreaseProducts = (newItems) => (newItems / CURRENT_PRODUCTS) * 100 + `%`;
export const handleIncreaseOrders = (newItems) =>
  Math.round((newItems / CURRENT_ORDERS) * 100) + `%`;
export const handleIncreaseRevenue = (newItems) =>
  newItems && Math.round(((newItems - CURRENT_REVENUE) / CURRENT_REVENUE) * 100);
