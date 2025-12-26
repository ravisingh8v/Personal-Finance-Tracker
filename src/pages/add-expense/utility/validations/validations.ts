import * as yup from "yup";

export const createExpenseSchema = yup.object({
  paymentTypeId: yup.number().required("Payment mode is required"),

  amount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .positive("Amount must be greater than 0")
    .required("Amount is required"),

  notes: yup
    .string()
    .trim()
    .max(250, "Note can be at most 250 characters")
    .nullable(),

  categoryId: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Category is required"),

  transactionTypeId: yup.number().required(),
  transactionDate: yup
    .date()
    // .max(
    //   new Date(Date.now() + 1000) /*1s Buffer Due to on change validation */,
    //   "Transaction date cannot be in the future"
    // )
    .required("Transaction date is required"),
});
