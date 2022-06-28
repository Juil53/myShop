import { constant as c } from "../constants";
import { delay } from "../utils";

const call = async ({
  baseUrl = c.API_URL,
  path = "",
  method = "GET",
  headers = {},
  query = null,
}) => {
  try {
    let res = await fetch(`${baseUrl}/${path}`, {
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

const get = ({ baseUrl = c.API_URL, path = "", headers = {} }) =>
  call({ baseUrl, path, headers, method: "GET" });

const post = ({ baseUrl = c.API_URL, path = "", headers = {}, query = {} }) =>
  call({ baseUrl, path, headers, query, method: "POST" });

const put = ({ baseUrl = c.API_URL, path = "", headers = {}, query = {} }) =>
  call({ baseUrl, path, headers, query, method: "PUT" });

export default {
  get,
  post,
  put,
};
