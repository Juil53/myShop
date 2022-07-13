const CURRENT_USERS = 2;

export const handleNewUser = (users) => {
  const date = new Date().getMonth() + 1;
  const newUserThisMonth = [];
  users?.forEach((user, index) => {
    const userCreatedAt = user.timeStamp?.toDate().getMonth() + 1;
    if (userCreatedAt === date) {
      newUserThisMonth.push(user);
    }
  });
  return newUserThisMonth.length;
};

export const handleIncreaseUser = (newUser) => newUser / CURRENT_USERS * 100 + `%`
  
  