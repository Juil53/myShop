import * as Yup from "yup";

export const validation = Yup.object().shape({
  name: Yup.string()
    .required("name is required "),
  brand: Yup.string()
    .required("brand is required"),
  insurance: Yup.string()
    .required("insurance is required"),
  status: Yup.string().email("Email not valid").required("Email is required"),
  phonenumber: Yup.number().required("Phone is required"),
  role: Yup.string().required("Please select a role").oneOf(role),
});
