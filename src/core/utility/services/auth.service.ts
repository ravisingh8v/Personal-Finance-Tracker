import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../shared/utility/auth/axiosBaseQuery";
import {
  API_ROUTES,
  API_URL,
} from "../../../shared/utility/constants/constants";

const url = API_URL;

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: axiosBaseQuery(url),
  endpoints: (builder) => ({
    login: builder.mutation<any, { phoneNumber: string; password: string }>({
      query: (body) => ({
        url: `${API_ROUTES.LOGIN}`,
        method: "POST",
        data: body,
      }),
    }),
    signUp: builder.mutation<
      any,
      { name: string; phoneNumber: string; password: string }
    >({
      query: (data) => ({
        url: `${API_ROUTES.SIGN_IP}`,
        method: "POST",
        data,
      }),
    }),
    verifyOtp: builder.mutation<any, { tempUserId: string; otp: string }>({
      query: (data) => ({
        url: `${API_ROUTES.VERIFY_OTP}`,
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useVerifyOtpMutation } =
  auth;
