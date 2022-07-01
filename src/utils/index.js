function priceBreak(price) {
  if (price) {
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
  return 0;
}

function discount(pricebefore, priceafter) {
  let kq = 0;

  if (pricebefore !== priceafter) {
    kq = Math.round(((pricebefore - priceafter) / pricebefore) * 100);
  }

  return kq;
}

function calAmount(quantity, unitPrice) {
  return quantity * unitPrice;
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

export const checkEmailFormat = (email) => {
  const txt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return txt.test(email);
};

//(123) 456-7890 (123)456-7890 123-456-7890 123.456.7890 1234567890 +31636363634 075-63546725
export const checkPhoneFormat = (phone) => {
  const txt = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return txt.test(phone);
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

export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const clone = (obj) => JSON.parse(JSON.stringify(obj));

const calTotal = (cart) => {
  return cart.productList.reduce((pre, cur) => pre + cur.totalPrice, 0);
};

export const utils = {
  priceBreak,
  discount,
  calAmount,
  calTotal,
};
