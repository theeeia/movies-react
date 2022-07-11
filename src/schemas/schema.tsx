import * as yup from "yup"

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#])[A-Za-z\d@!#]{8,}$/

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(8).matches(passwordRules, {message: "Please enter a stronger password"}).required("Required"),
})

export const registerSchema = loginSchema.shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Required")
})