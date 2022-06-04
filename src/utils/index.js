import localStorage from "../service/localStorage";

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

export const updateCart = (product, currentOption, curNumber) => {
  const cart = localStorage.get("cart");
  const currentCart =
    cart &&
    cart.productList &&
    cart.productList.length &&
    cart.productList.length > 0
      ? { ...cart }
      : {
          productList: [],
          totalAmount: 0,
        };

  const sameProduct = currentCart.productList.filter(
    (v) => v.id === product.id
  );

  if (Object.keys(currentOption).length !== 0) {
    const sameOption = sameProduct.filter(
      (v) => JSON.stringify(v.optionSelected) === JSON.stringify(currentOption)
    );

    if (sameOption.length && sameOption.length !== 0) {
      sameOption[0].quantity = curNumber;
      sameOption[0].totalPrice =
        sameOption[0].quantity * product.priceAfterDiscount;
    }
  } else {
    sameProduct[0].quantity = curNumber;
    sameProduct[0].totalPrice =
      sameProduct[0].quantity * product.priceAfterDiscount;
  }

  //tinh lai tong tien
  currentCart.totalAmount = currentCart.productList.reduce(
    (pre, cur) => pre + cur.totalPrice,
    0
  );

  return currentCart;
};

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
  calAmount,
};
