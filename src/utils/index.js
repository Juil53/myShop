function priceBreak(price) {
  price = price.toString();
  let giatien = "";
  let count = price.length % 3;
  for (let i = 0; i < price.length; i++) {
    giatien += price[i];
    count--;

    if (count % 3 === 0 && i < price.length - 1) {
      giatien += ".";
    }
  }
  return giatien;
}

function discount(pricebefore, priceafter) {
  let kq = 0;

  if (pricebefore !== priceafter) {
    kq = Math.round(((pricebefore - priceafter) / pricebefore) * 100);
  }

  return kq;
}

export const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

export const clone = (obj) => JSON.parse(JSON.stringify(obj));

export const utils = {
  priceBreak,
  discount,
};
