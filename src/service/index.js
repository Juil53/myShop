import { constant as c } from "../constants";
import { delay } from "../utils";

const call = async ({
  baseUrl = c.API_URL,
  path = "",
  method = "GET",
  headers = {
    "Content-Type": "application/json",
  },
  query = null,
}) => {
  try {
    headers = headers || { "Content-Type": "application/json" };
    const willConvertJson = headers["Content-Type"].includes("json");
    const body = willConvertJson && query ? JSON.stringify(query) : query;
    let res = await fetch(`${baseUrl}/${path}`, {
      method,
      headers: {
        ...headers,
      },
      body,
    });

    await delay(1000);

    if (!res.ok) {
      const { message } = await res.json();
      throw { name: "API request error", message };
    }
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const get = ({ baseUrl = c.API_URL, path = "", headers }) =>
  call({ baseUrl, path, headers, method: "GET" });

const post = ({ baseUrl = c.API_URL, path = "", headers, query = {} }) =>
  call({ baseUrl, path, headers, query, method: "POST" });

const put = ({ baseUrl = c.API_URL, path = "", headers, query = {} }) =>
  call({ baseUrl, path, headers, query, method: "PUT" });

const patch = ({ baseUrl = c.API_URL, path = "", headers, query = {} }) =>
  call({ baseUrl, path, headers, query, method: "PATCH" });

export default {
  get,
  post,
  put,
  patch,
};
