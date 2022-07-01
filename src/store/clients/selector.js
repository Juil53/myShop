export const clientSelector = (state) => {
  const { client = {} } = state || [];
  return client;
};

export const clientData = (state) => {
  const { client = {} } = state || [];
  const { data = {} } = client;
  return data;
};
