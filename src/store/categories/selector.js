export const categoriesSelector = (state) => ({
  categories: state.categories
    ? state.categories
    : { status: "FAIL", data: [] },
});
