export const selectAttributes = (state) => {
  const { adminProduct = {} } = state || {};
  const { options = [] } = adminProduct;
  return options;
};

export const selectCategories = (state) => {
  const { adminProduct = {} } = state || {};
  const { categories = [] } = adminProduct;
  return categories;
};

export const selectLoading = (state) => {
  const { adminProduct = {} } = state || {};
  const { loading = false } = adminProduct;
  return loading;
};

export const selectAllProduct = (state) => {
  const { adminProduct = {} } = state || {};
  const { products = [] } = adminProduct;
  return products;
};

export const selectProductPagination = (state) => {
  const { adminProduct = {} } = state || {};
  const { productsPagination = [] } = adminProduct;
  return productsPagination;
};

export const selectProductInfo = (state) => {
  const { adminProduct = {} } = state || {};
  const { productInfo = [] } = adminProduct;
  return productInfo;
};
