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
