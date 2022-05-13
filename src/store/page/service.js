import { constant as c } from "../../constants";

const getHomePage = () => {
  const reqObj = {
    method: "GET",
  };
  return fetch(c.API_URL + "/home", reqObj)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export const service = {
  getHomePage,
};
