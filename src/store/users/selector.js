export const selectUserKeyword = (state) => {
  const { user = {} } = state || {};
  const { keyword = [] } = user;
  return keyword;
};

export const selectUserOpen = (state) => {
  const { user = {} } = state || {};
  const { open = [] } = user;
  return open;
};

export const selectUserInfo = (state, id) => {
  const { user = {} } = state || {};
  const { userData = [] } = user;
  return userData.find((user) => user.id === id);
};

export const selectUserDataPagination = (state) => {
  const { user = {} } = state || {};
  const { userDataPagination = [] } = user;
  return userDataPagination;
};

export const selectUserData = (state) => {
  const { user = {} } = state || {};
  const { userData = [] } = user;
  return userData;
};
