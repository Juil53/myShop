export const clientSelector = (state) => {
  const { client = {} } = state || [];
  return client;
};

export const selectClients = (state) => {
  const { client = {} } = state || {};
  const { clients = [] } = client;
  return clients;
};

export const clientData = (state) => {
  const { client = {} } = state || [];
  const { data = {} } = client;
  return data;
};

export const selectCustomers = (state) => {
  const { client = {} } = state || [];
  const { customers = [] } = client;
  return customers;
};

export const selectCustomer = (state) => {
  const { client = {} } = state || [];
  const { customer = {} } = client;
  return customer;
};

export const selectStatus = (state) => {
  const { client = {} } = state || [];
  const { status } = client || false;
  return status;
};

export const selectLoading = (state) => {
  const { client = {} } = state || [];
  const { loading } = client || false;
  return loading;
};
