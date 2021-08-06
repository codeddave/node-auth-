import * as Yup from 'yup'

export const RegisterSchema = Yup.object().shape({
    username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
  email: Yup.string()
    .trim()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .email("Invalid email")
    .required("Required"),
    password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

})