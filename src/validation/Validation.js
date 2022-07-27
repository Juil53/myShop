import * as Yup from "yup";

const role = ["Staff", "Admin"];

export const validation = Yup.object().shape({
  firstname: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required "),
  lastname: Yup.string().min(5, "Too Short!").max(50, "Too Long!").required("Lastname is required"),
  password: Yup.string()
    .min(8, "Password is too short, should be 8 chars min")
    .max(12, "Maximum 8 chars")
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required("Password is required"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Password must match"),
  email: Yup.string().email("Email not valid").required("Email is required"),
  phonenumber: Yup.number().required("Phone is required"),
  role: Yup.string().required("Please select a role").oneOf(role),
});
