import * as Yup from "yup";

const role = ["Client", "Admin"];

export const validation = Yup.object().shape({
  firstname: Yup.string()
    .min(5, "Required 5 characters")
    .required("Firstname is required "),
  lastname: Yup.string()
    .max(5, "Required 5 characters")
    .required("Lastname is required"),
  password: Yup.string()
    .min(8, "Password is too short, should be 8 chars min")
    .max(12,"Maximum 8 chars")
    .required("Password is required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
  email: Yup.string().email("Email not valid").required("Email is required"),
  phonenumber: Yup.number().required("Phone is required"),
  role: Yup.string().required("Please select a role").oneOf(role),
});
