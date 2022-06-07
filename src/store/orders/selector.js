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