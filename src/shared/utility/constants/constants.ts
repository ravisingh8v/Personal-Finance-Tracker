import type { MantineColor } from "@mantine/core";
import type { IUiHeader } from "../../components/UiHeader";

export const API_URL = import.meta.env.VITE_API_URL;
// export const API_URL = 'http://localhost:8080/api/v1/';

export const QueryTags = {
  Book: "Book",
  Expense: "Expense",
  CATEGORY: "Category",

  // No Use
  OrderDetails: "OrderDetails",
};

// NO Use

export const API_ROUTES = {
  BOOK: "book",
  EXPENSE: "expense",
  CATEGORY: "category",

  LOGIN: "restaurants/login",
  SIGN_IP: "users/sign-up",
  VERIFY_OTP: "users/verify",
  RESTAURANTS: "restaurants",
  RESTAURANT: "restaurant",
  MENU: "menu",
  ITEMS: "items",
  CATEGORIES: "categories",
  WITHDRAW: "withdraw",
  CART: "cart",
  USERS: "users",
  COUNT: "count",
  REMOVE: "remove",
  SEARCH: "search",
  ADDRESSES: "addresses",
  ADDRESS: "address",
  ORDERS: "orders",
  CREATE_CHECKOUT_SESSION: "create-checkout-session",
  VERIFY_PAYMENT: "verifyPayment",
  DETAIL: "detail",
  USER: "user",
  INSTRUCTIONS: "instructions",
  CANCEL: "cancel",
  ACTION: "action",
  EARNINGS: "earnings",
};

export const MENU_LINKS = {
  DEFAULT: "/",
  BOOK: "/book",
  ADD_BOOK: "/add-book",
  EDIT_BOOK: "/edit-book",
  EXPENSES: "/expenses",
  REPORTS: "/reports",
  EXPENSE_ADD: "/add",
  EXPENSE_EDIT: "/edit",

  // SEARCH: '/search',
  ACCOUNT: "/account",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  VERIFY: "/verify",
  MENUS: "/menus",
  MENU_DETAILS: "/menus/:id",
  ACCESS_DENIED: "/access-denied",
  RESTAURANTS_WITH_SPECIFIC_CATEGORY: "/restaurants-with-specific-category",
  RESTAURANT: "restaurant",
  CART: "/account/cart",
  ADDRESSES: "/account/addresses",
  MY_ORDERS: "/account/my-orders",
  RESTAURANT_PROFILE: "/account/restaurant-profile",
  PAYMENT_HISTORY: "/account/payment-history",
  ORDER: "/order",
  PAST_ORDERS: "/account/past-orders",
  ADDRESS: "/address",
  NOTIFICATION: "notification",
};

export const TAG_TYPES = {
  MENU: "menu",
  MENU_ITEMS: "menuItems",
  WITHDRAW_AMOUNT: "withdrawAmount",
};

export const LOCAL_STORAGE_KEYS = {
  TOKEN: "tbd_token",
  AUTH_DATA: "tbd_authData",
  CART_DATA: "tbd_cart_data",
};

export const APP_SLICE_INITIAL_VALUES: {
  showHeader: boolean;
  showBottomBar: boolean;
  bgColor: MantineColor;
  subHeader: IUiHeader;
} = {
  showHeader: true,
  showBottomBar: true,
  bgColor: "#fff",
  subHeader: {
    title: "N/A",
    order: 2,
    withDivider: false,
    history: undefined,
    withBackButton: true,
    rightSection: null,
    withShadow: false,
  },
};

export const PaymentModes = [
  { label: "Cash", value: "1" },
  { label: "Bank Transfer", value: "2" },
  { label: "Credit Card", value: "3" },
  { label: "UPI / Digital Wallet", value: "4" },
];

// export const QueryTags = {
//   OrderDetails: "OrderDetails",
// };
