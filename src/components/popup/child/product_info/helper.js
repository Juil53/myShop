const currentProduct = {
  id: "",
  optionsId: [],
  availableOptions: [], //ds cac option kha dung cua product
};

const getOptionsId = (product) => {
  if (currentProduct.id === product.id) {
    return currentProduct.optionsId;
  }

  const { configurableOptions = [] } = product;

  if (!configurableOptions.length) return [];

  currentProduct.optionsId = configurableOptions.map((option) => {
    return option.id;
  });
  currentProduct.id = product.id;

  return currentProduct.optionsId;
};

export const getAvailableOptions = (product) => {
  if (currentProduct.id === product.id) {
    return currentProduct.availableOptions;
  }

  const optionsId = getOptionsId(product);
  const { configurableProducts = [] } = product;

  if (!configurableProducts.length) return [];

  const rs = {};

  configurableProducts.forEach((p) => {
    const key = {};

    optionsId.forEach((option) => {
      key[option] = p[option];
    });

    if (p.selected) {
      currentProduct.currentOption = key;
    }

    rs[JSON.stringify(key)] = p.available;
  });
  console.log(rs);
  currentProduct.availableOptions = rs;
  return rs;
};

export const isAvailableOption = ({
  product,
  currentOption = {},
  optionId = "",
  optionValue = "",
}) => {
  const availableOptions = getAvailableOptions(product);
  const key = { ...currentOption };

  key[optionId] = optionValue;

  return !!availableOptions[JSON.stringify(key)];
};

export const getQuantityAvailable = ({
  product,
  currentOption = {},
  optionId = "",
  optionValue = "",
}) => {
  const availableOptions = getAvailableOptions(product);
  const key = { ...currentOption };

  if (optionId) {
    key[optionId] = optionValue;
  }

  return availableOptions[JSON.stringify(key)];
};

export const selectUnavailableOption = ({
  product = {},
  optionId = "",
  optionValue = "",
}) => {
  const availableOptions = getAvailableOptions(product);

  for (let i in availableOptions) {
    const option = JSON.parse(i);
    if (option[optionId] === optionValue && availableOptions[i]) {
      console.log(option);
      return [option, availableOptions[i]];
    }
  }
};
