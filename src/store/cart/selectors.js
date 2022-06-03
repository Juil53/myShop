export const selectCart = (state) => {
  const { cart = {} } = state || [];
  return cart;
};
