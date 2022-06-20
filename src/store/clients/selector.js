export const clientSelector = (state) => {
  const { client = {} } = state || [];
  return client;
};
