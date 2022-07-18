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
