import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#])[A-Za-z\d@!#]{8,}$/;

export const ACCOUNT_EDIT_SCHEMA = yup.object().shape({
  first_name: yup.string().min(2, "Name must be atleast 2 characters").required("Required"),
  last_name: yup.string().min(2, "Last name must be atleast 2 characters").required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please enter a stronger password" })
    .oneOf([yup.ref("confirmPassword"), null], "Must confirm password"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});
