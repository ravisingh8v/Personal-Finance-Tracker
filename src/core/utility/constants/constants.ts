import {
  Button,
  createTheme,
  Notification,
  Textarea,
  TextInput,
  type CSSVariablesResolver,
} from "@mantine/core";
import { IconBook2, IconChartHistogram } from "@tabler/icons-react";

export const theme = createTheme({
  primaryColor: "brand",
  primaryShade: 5,
  fontFamily: "Sen, sans-serif",
  colors: {
    brand: [
      "#f0efff",
      "#dddbf8",
      "#b7b5e8",
      "#908cd8",
      "#7974cf",
      "#5953c4",
      "#4e48c1",
      "#3f3aab",
      "#37339a",
      "#2d2b89",
    ],
  },
  cursorType: "pointer",
  focusRing: "never",
  components: {
    TextInput: TextInput.extend({
      styles: (theme) => ({
        input: {
          // borderColor: theme.colors.gray[2],
          // backgroundColor: "var(--mantine-input-bg-color)",
          paddingInline: "15px",
          paddingBlock: "25px",
          fontSize: "16px",
        },
        label: {
          fontSize: "16px",
        },
      }),
    }),
    Textarea: Textarea.extend({
      styles: (theme) => ({
        input: {
          fontSize: "16px",
        },
        label: {
          fontSize: "16px",
        },
      }),
    }),
    Button: Button.extend({
      defaultProps: {
        size: "lg",
      },
    }),
    Notification: Notification.extend({
      styles: () => ({
        title: {
          fontSize: "16px",
        },
        description: {
          fontSize: "16px",
        },
      }),
    }),
  },
});

export const resolver: CSSVariablesResolver = () => ({
  variables: {
    "--mantine-auth-screen-bg-color": "#121223",
    "--mantine-input-bg-color": "#F0F5FA",
  },
  dark: {
    "--mantine-color-badge-text-purple": "#ffffff",
    "--mantine-color-primary-dark": "#ffffff",
  },
  light: {},
});

export const signInValidationsConfig = {
  PHONE_NUMBER_REQUIRED: "Please enter the Phone Number.",
  PASSWORD_REQUIRED: "Please enter the Password.",
  PHONE_NUMBER_MAX_LENGTH: 10,
  PHONE_NUMBER_MAX_LENGTH_MESSAGE: "Phone number should be 10 digits long.",
};

export const signUpValidationsConfig = {
  NAME_REQUIRED: "Please enter the Name.",
  EMAIL_REQUIRED: "Please enter the Name.",
  PHONE_NUMBER_REQUIRED: "Please enter the Phone Number.",
  PASSWORD_REQUIRED: "Please enter the Password.",
  CONFIRM_PASSWORD_REQUIRED: "Please enter the Confirm Password.",
  CONFIRM_PASSWORD_NOT_MATCH: "Password and Confirm Password does not match.",
  PHONE_NUMBER_MAX_LENGTH: 10,
  PHONE_NUMBER_MAX_LENGTH_MESSAGE: "Phone number should be 10 digits long.",
  EMAIL_REGEX: /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.\S{2}/,
  EMAIL_INVALID: "Please enter a valid Email",
};

export const bottomBarItems = [
  {
    id: 0,
    path: "/",
    icon: IconBook2,
  },
  {
    id: 1,
    path: "/",
    icon: IconChartHistogram,
  },
  // {
  //   id: 2,
  //   path: '/',
  //   icon: IconChartInfographic,
  // },

  // {
  //   id: 4,
  //   path: "/",
  //   icon: IconUser,
  // },
];

// export const authSliceInitialValues: IUserSlice = {
//   token: "",
//   authData: null,
//   isAuthenticated: false,
// };

export const ERROR_MESSAGES = {
  TOKEN_INVALID: "TOKEN_INVALID",
  ACCESS_TOKEN_EXPIRED: "ACCESS_TOKEN_EXPIRED",
  ACCESS_DENIED: "ACCESS_DENIED",
  // add more as needed
};
