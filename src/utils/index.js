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

export const removeAccents = (str) => {
  const AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (let i = 0; i < AccentsMap.length; i++) {
    const re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    const char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
};

export const debounce = (fn, time) => {
  let timer = null;

  return function () {
    const args = arguments;
    const context = this;

    //clear timer cu
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, time);
  };
};

export const clone = (obj) => JSON.parse(JSON.stringify(obj));

export const utils = {
  priceBreak,
  discount,
};
