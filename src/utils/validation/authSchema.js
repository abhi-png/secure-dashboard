import * as yup from "yup"

export const userLoginSchema = yup.object().shape({
    email:yup
    .string()
    .email("Please enter a valid email id")
    .required("Please enter your email"),
    password:yup
    .string() 
    .min(5, "Password must be five characters long")
    .max(12, "Password should be between eight and twelve characters long")
    .required("Please Enter your password"),
})

export const userRegisterSchema = yup.object().shape({
    email:yup
    .string()
    .email("Please enter a valid email id")
    .required("Please enter your email"),
    password:yup
    .string() 
    .min(5, "Password must be five characters long")
    .max(12, "Password should be between eight and twelve characters long")
    .required("Please Enter your password"),
})