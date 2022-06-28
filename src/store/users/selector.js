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

export const loginAdmin = (state) => {
  const { loginAdmin = {} } = state?.user || {};
  return loginAdmin;
};

export const selectLoading = (state) => {
  const { user = {} } = state || {};
  const { loading } = user;
  return loading;
};

export const selectStatus = (state) => {
  const { user = {} } = state || {};
  const { status } = user || false;
  return status;
};
