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

export const selectProductPagination = (state,filteredKeys) => {
  const { adminProduct = {} } = state || {};
  const { productsPagination = [] } = adminProduct;
  // return productsPagination;
  return handleFiltered(productsPagination, filteredKeys);
};

export const selectProductInfo = (state, id) => {
  const { adminProduct = {} } = state || {};
  const { products = [] } = adminProduct;
  return products.find((product) => product.id === id);
};


//Data trả về bị sai
const handleFiltered = (data, filteredKeys) => {
  return data.filter((product) => product.categories.includes(filteredKeys[0]));
};
