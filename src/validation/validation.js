import * as Yup from "yup";

export const validation = Yup.object().shape({
  firstname: Yup.string().min(5, "min 5").required("Required Firstname"),
  lastname: Yup.string().max(5, "min 5").required("Required lastname"),
});
