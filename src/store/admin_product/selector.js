export const selectOptions = (state) => {
  const { adminProduct = {} } = state || {};
  const { options = [] } = adminProduct;
  return options;
};

