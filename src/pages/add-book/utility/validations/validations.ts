import * as yup from "yup";

export const createBookSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Book name is required")
    .max(50, "Book name must be at most 50 characters"),

  description: yup
    .string()
    .trim()
    .max(250, "Description must be at most 250 characters")
    .nullable()
    .notRequired(),
});
