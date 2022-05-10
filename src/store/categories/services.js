import { constant } from "../../constants";

function getAllCategory() {
  const reqObj = {
    method: "GET",
  };
  
  return fetch(constant.API_URL + "/category", reqObj)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      console.log(err);
      return [];
    });
}
export const categoryService = {
  getAllCategory,
};

