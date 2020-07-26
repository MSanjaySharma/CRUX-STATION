import * as Yup from "yup";

const FILE_SIZE = 1000000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const schema = Yup.object().shape({
  username: Yup.string("Username must be a String").required(
    "Username is Required"
  ),
  name: Yup.string("Name must be a String").required("Name is Required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is Required"),
  about: Yup.string()
    .required("About is Required")
    .min(15, "Minimum 15 characters required")
    .max(300, "Maximum allowed characters is 300"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  /*  .matches(/[a-zA-Z0-9!@#$%&*()]/, 'Password can only contain a-zA-Z0-9!@#$%&*()') */
});

export const photoSchema = Yup.object().shape({
  photo: Yup.mixed()
    .required("Feature photo is required")
    .test(
      "fileSize",
      "Feature Photo Size is too large (max 1MB)",
      (value) => value.size <= FILE_SIZE
    )
    .test("fileType", "Unsupported File Format. Supported formats are .jpg .jpeg .gif .png", (value) =>
      SUPPORTED_FORMATS.includes(value.type)
    ),
})