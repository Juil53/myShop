export const categoriesSelector = (state) => ({
  categories: state.categories ? state.categories : { status: "FAIL", data: [] },
});

export const selectLoading = (state) => {
  const { categories = {} } = state || {};
  const { loading = false } = categories;
  return loading;
};

export const selectCategory = (state) => {
  const { categories = {} } = state || {};
  const { categorySelected = "" } = categories;
  return categorySelected;
};

export const selectSubCategory = (state) => {
  const { categories = {} } = state || {};
  const { subCategorySelected = "" } = categories;
  return subCategorySelected;
};
