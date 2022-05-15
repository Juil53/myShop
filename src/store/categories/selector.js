export const categoriesSelector = (state) => ({
  data: state.categories ? state.categories : { status: "FAIL", data: [] },
});
