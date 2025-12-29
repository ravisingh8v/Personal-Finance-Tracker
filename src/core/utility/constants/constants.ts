import {
  Button,
  createTheme,
  Notification,
  NumberInput,
  Select,
  Textarea,
  TextInput,
  type CSSVariablesResolver,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconBook2, IconChartHistogram } from "@tabler/icons-react";
import { MENU_LINKS } from "../../../shared/utility/constants/constants";

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
      styles: () => ({
        input: {
          // borderColor: "transparent",
          // backgroundColor: "transparent",
          paddingInline: "15px",
          paddingBlock: "20px",
          fontSize: "16px",
        },
        label: {
          fontSize: "16px",
          color: "var(--mantine-color-dark-text)",
        },
      }),
    }),
    NumberInput: NumberInput.extend({
      styles: () => ({
        input: {
          // borderColor: "transparent",
          // backgroundColor: "transparent",
          paddingInline: "15px",
          paddingBlock: "20px",
          fontSize: "16px",
        },
        label: {
          fontSize: "16px",
          color: "var(--mantine-color-dark-text)",
        },
      }),
    }),
    Textarea: Textarea.extend({
      styles: () => ({
        input: {
          fontSize: "16px",
          paddingInline: "15px",
          paddingBlock: "10px",
        },
        label: {
          fontSize: "16px",
          color: "var(--mantine-color-dark-text)",
        },
      }),
    }),
    Select: Select.extend({
      styles: () => ({
        input: {
          fontSize: "16px",
          paddingInline: "15px",
          paddingBlock: "20px",
        },
        label: {
          fontSize: "16px",
          color: "var(--mantine-color-dark-text)",
        },
      }),
    }),
    DateTimePicker: DateTimePicker.extend({
      styles: () => ({
        input: {
          fontSize: "16px",
          paddingInline: "15px",
          paddingBlock: "7px",
        },
        label: {
          fontSize: "16px",
          color: "var(--mantine-color-dark-text)",
        },
        timeInput: {
          fontSize: "16px",
        },
        timeWrapper: {
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
    path: MENU_LINKS.REPORTS,
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
