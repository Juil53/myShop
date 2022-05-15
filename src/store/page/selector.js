export const pageSelector = (state) => ({
  banners: state.page ? state.page.banners : [],
});
