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
  let temp = [];
  let newProducts = [];
  if (filterOptions.length > 0) {
    for (let i = 0; i < filterOptions.length; i++) {
      temp = products.filter((product) => product.categories?.includes(filterOptions[i]));
      newProducts.push(...temp)
    }
    return newProducts;
  }

  return products;
};

export const selectProductPagination = (state, filterOptions) => {
  const { adminProduct = {} } = state || {};
  const { productsPagination = [] } = adminProduct;

  let temp = [];
  let newProducts = [];
  if (filterOptions.length > 0) {
    for (let i = 0; i < filterOptions.length; i++) {
      temp = productsPagination.filter((product) => product.categories?.includes(filterOptions[i]));
      newProducts.push(...temp)
    }
    return newProducts;
  }
  return productsPagination;
};

export const selectProductInfo = (state, id) => {
  const { adminProduct = {} } = state || {};
  const { products = [] } = adminProduct;
  return products.find((product) => product.id === id);
};
