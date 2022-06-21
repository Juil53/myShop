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

export const selectAllProduct = (state, filterOptions) => {
  const { adminProduct = {} } = state || {};
  const { products = [] } = adminProduct;
  
  if (filterOptions.length > 0) {
    for (let i = 0; i < filterOptions.length; i++) {
      return products.filter((product) => product.categories.includes(filterOptions[i]));
    }
  }

  return products;
};

export const selectProductPagination = (state, filterOptions) => {
  const { adminProduct = {} } = state || {};
  const { productsPagination = [] } = adminProduct;

  if (filterOptions.length > 0) {
    for (let i = 0; i < filterOptions.length; i++) {
      return productsPagination.filter((product) => product.categories.includes(filterOptions[i]));
    }
  }
  return productsPagination;
};

export const selectProductInfo = (state, id) => {
  const { adminProduct = {} } = state || {};
  const { products = [] } = adminProduct;
  return products.find((product) => product.id === id);
};
