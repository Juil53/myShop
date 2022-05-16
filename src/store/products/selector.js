export const productSelector = (state) => ({
  hotProducts: state.products ? state.products.hotProducts : [],
  allProducts: state.products ? state.products.allProducts : [],
  newProducts: state.products ? state.products.newProducts : [],
});
