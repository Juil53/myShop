export const getUser = (state) => {
  const { userData = {} } = state || [];
  return userData;
};
