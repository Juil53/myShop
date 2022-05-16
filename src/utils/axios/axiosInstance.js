import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "content-type": "application/json",
    //Add authen or indentify Admin client or User client
    Authorization: {},
  },
});

apiInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default apiInstance;