export const pageSelector = (state) => ({
  banners: state.page ? state.page.banners : [],
  popup: state.page ? state.page.popup : {},
});
