export const productSelector = (state) => ({
  hotProducts: state.products ? state.products.hotProducts : [],
  allProducts: state.products ? state.products.allProducts : [],
  newProducts: state.products ? state.products.newProducts : [],
  bestSellingProducts: state.products ? state.products.bestSellingProducts : [],
});

export const selectProduct = (state, mainCate, subCate) => {
  const { products = {} } = state || {};
  const { allProducts = {} } = products;
  const { data = [] } = allProducts;

  if (mainCate && !subCate) {
    return data.filter((product) => product.categories.includes(mainCate));
  }
  if (mainCate && subCate) {
    return data.filter((product) => product.categories.includes(subCate));
  }
  return data;
};
