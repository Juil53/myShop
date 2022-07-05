import { constant } from "../constants";

export const checkEmailFormat = (email) => {
  const txt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return txt.test(email);
};

//(123) 456-7890 (123)456-7890 123-456-7890 123.456.7890 1234567890 +31636363634 075-63546725
export const checkPhoneFormat = (phone) => {
  const txt = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return txt.test(phone);
};

export const checkMinLength = (value, length) => {
  if (value.length < parseInt(length)) {
    return false;
  }

  return true;
};

export const checkName = (name) => {
  if (name.length < 6) {
    return constant.shortName;
  } else if (name.length > 50) {
    return constant.longName;
  }
  return constant.validName;
};
