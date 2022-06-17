export const productSelector = (state) => ({
  hotProducts: state.products ? state.products.hotProducts : [],
  allProducts: state.products ? state.products.allProducts : [],
  newProducts: state.products ? state.products.newProducts : [],
  bestSellingProducts: state.products ? state.products.bestSellingProducts : [],
});

export const selectProduct = (state, mainCate, subCate, sortCate) => {
  const { products = {} } = state || {};
  const { allProducts = {} } = products;
  const { data = [] } = allProducts;
  const dataMainCate = data.filter((product) => product.categories.includes(mainCate));
  const dataSubCate = data.filter((product) => product.categories.includes(subCate));

  const handleSort = (data, sort) => {
    const arr = [...data];
    switch (sort) {
      case "asc":
        return arr.sort((a, b) => a.priceBeforeDiscount - b.priceBeforeDiscount);
      case "des":
        return arr.sort((a, b) => a.priceBeforeDiscount - b.priceBeforeDiscount).reverse();
      case "az":
        return arr.sort((a, b) => {
          const x = a.name.toUpperCase();
          const y = b.name.toUpperCase();
          return x.localeCompare(y);
        });
      case "za":
        return arr.sort((a, b) => {
          const x = a.name.toUpperCase();
          const y = b.name.toUpperCase();
          return y.localeCompare(x);
        });
      case "default":
        return arr;
      default:
        return arr;
    }
  };

  if (mainCate == "" && subCate == "") {
    if (!sortCate) {
      return data;
    }
    return handleSort(data, sortCate);
  } else if (mainCate && subCate == "") {
    if (!sortCate) {
      return handleSort(dataMainCate);
    }
    return handleSort(dataMainCate, sortCate);
  } else if (mainCate && subCate) {
    if (!sortCate) {
      return handleSort(dataSubCate);
    }
    return handleSort(dataSubCate, sortCate);
  }

  return data;
};

export const selectProductInfo = (state, id) => {
  const { products = {} } = state || {};
  const { allProducts = {} } = products;
  const { data = [] } = allProducts;

  const productSelected = data.find((product) => product.id == id);
  return productSelected;
};
