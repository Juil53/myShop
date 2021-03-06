export const selectOrderData = (state) => {
  const { order = {} } = state || {};
  const { orderData = [] } = order;
  return orderData;
};

export const selectLoading = (state) => {
  const { order = {} } = state || {};
  const { loading = false } = order;
  return loading;
};

export const selectOrderPagination = (state) => {
  const { order = {} } = state || {};
  const { orderDataPagination = [] } = order;
  return orderDataPagination;
};

export const selectModalOpen = (state) => {
  const { order = {} } = state || {};
  const { isOpen = false } = order;
  return isOpen;
};

export const selectOrderDetail = (state) => {
  const { order = {} } = state || {};
  const { orderDetail = {} } = order;
  return orderDetail;
};

export const selectOrderKeyword = (state) => {
  const { order = {} } = state || {};
  const { keyword = [] } = order;
  return keyword;
};

export const selectStatus = (state) => {
  const { order = {} } = state || {};
  const { status } = order;
  return status;
};

export const orderAddress = (state) => {
  const { order = {} } = state || {};
  const { orderAddress } = order;
  return orderAddress;
};

export const addOrder = (state) => {
  const { order = {} } = state || {};
  const { addOrder } = order;
  return addOrder;
};

export const orderByClient = (state) => {
  const { order = {} } = state || {};
  const { orderByClient } = order;
  return orderByClient;
};

export const orderById = (state) => {
  const { order = {} } = state || {};
  const { orderById } = order;
  return orderById;
};
