export const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

export const clone = (obj) => JSON.parse(JSON.stringify(obj));
