import { constant as c } from "../constants";
import { delay } from "../utils";

const call = async ({
  path = "",
  method = "GET",
  headers = {},
  query = null,
}) => {
  try {
    let res = await fetch(`${c.API_URL}/${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: query ? JSON.stringify(query) : null,
    });

    await delay(1000);

    if (!res.ok) {
      const { message } = await res.json();
      throw { name: "API request error", message };
    }
    res = await res.json();

    return res;
  } catch (err) {
    return null;
  }
};

const get = ({ path = "", headers = {} }) =>
  call({ path, headers, method: "GET" });

const post = ({ path = "", headers = {}, query = {} }) =>
  call({ path, headers, query, method: "POST" });

const put = ({ path = "", headers = {}, query = {} }) =>
  call({ path, headers, query, method: "PUT" });

export default {
  get,
  post,
  put,
};
