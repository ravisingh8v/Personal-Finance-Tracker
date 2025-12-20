import * as Yup from "yup";
import {
  signInValidationsConfig,
  signUpValidationsConfig,
} from "../constants/constants";

export const signInValidations = Yup.object({
  phoneNumber: Yup.string()
    .required(signInValidationsConfig.PHONE_NUMBER_REQUIRED)
    .max(
      signInValidationsConfig.PHONE_NUMBER_MAX_LENGTH,
      signInValidationsConfig.PHONE_NUMBER_MAX_LENGTH_MESSAGE
    ),
  password: Yup.string().required(signInValidationsConfig.PASSWORD_REQUIRED),
});

export const signUpValidations = Yup.object({
  name: Yup.string().required(signUpValidationsConfig.NAME_REQUIRED),
  phoneNumber: Yup.string()
    .required(signUpValidationsConfig.PHONE_NUMBER_REQUIRED)
    .max(
      signUpValidationsConfig.PHONE_NUMBER_MAX_LENGTH,
      signUpValidationsConfig.PHONE_NUMBER_MAX_LENGTH_MESSAGE
    ),
  password: Yup.string().required(signUpValidationsConfig.PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      signUpValidationsConfig.CONFIRM_PASSWORD_NOT_MATCH
    )
    .required(signUpValidationsConfig.PASSWORD_REQUIRED),
});
