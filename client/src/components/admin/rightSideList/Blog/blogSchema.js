import * as Yup from "yup";

const FILE_SIZE = 1000000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const blogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(4,"Title is too Short. Minimum 4 characters").max(160, "Title should be within 160 characters"),
  body: Yup.string().required("Body of the Blog is required").min(500, "body should have minimum 500 characters"),
  categories: Yup.array().required("Select at least one category"),
  tags: Yup.array().required("Select at least one tag"),
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
});
