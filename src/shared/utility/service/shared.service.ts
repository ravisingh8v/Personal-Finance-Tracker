import { createApi } from "@reduxjs/toolkit/query/react";

import type { AxiosResponse } from "axios";
import { axiosBaseQuery } from "../auth/axiosBaseQuery";
import { API_ROUTES, API_URL } from "../constants/constants";
import type { ICategoryRes } from "../model/model";

const sharedService = createApi({
  reducerPath: "sharedService",
  baseQuery: axiosBaseQuery(API_URL),
  tagTypes: [],
  endpoints: (builder) => ({
    getCategories: builder.query<AxiosResponse<ICategoryRes>, void>({
      query: () => ({
        url: `${API_ROUTES.CATEGORIES}`,
        method: "GET",
      }),
    }),

    // addToCart: builder.mutation<any, IAddToCartReqBody>({
    //   query: (data) => ({
    //     url: `${API_ROUTES.CART}`,
    //     method: "POST",
    //     data,
    //   }),
    //   invalidatesTags: (result: any) => (result.success ? ["Cart"] : []),
    // }),
    // getCartCount: builder.query<{ data: { count: number } }, void>({
    //   query: (data) => ({
    //     url: `${API_ROUTES.CART}/${API_ROUTES.COUNT}`,
    //     method: "GET",
    //     data,
    //   }),
    //   providesTags: ["Cart", "CartCount"],
    // }),
    // getCartItems: builder.query<{ data: ICartRes }, void>({
    //   query: (data) => ({
    //     url: `${API_ROUTES.CART}`,
    //     method: "GET",
    //     data,
    //   }),
    //   providesTags: ["Cart"],
    // }),
    // removeCartItem: builder.mutation<
    //   any,
    //   { cartItemId: number; isLastItem: boolean }
    // >({
    //   query: ({ cartItemId, isLastItem }) => ({
    //     url: `${API_ROUTES.CART}/${API_ROUTES.REMOVE}/${cartItemId}?isLastItem=${isLastItem}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: (result: any) => (result.success ? ["Cart"] : []),
    // }),
    // updateCartItem: builder.mutation<
    //   any,
    //   { cartItemId: number; quantity: number }
    // >({
    //   query: (data) => ({
    //     url: `${API_ROUTES.CART}`,
    //     method: "PUT",
    //     data,
    //   }),
    //   invalidatesTags: (result: any) => (result.success ? ["Cart"] : []),
    // }),
    // getUserAddresses: builder.query<{ data: { addresses: IAddress[] } }, void>({
    //   query: (data) => ({
    //     url: `${API_ROUTES.USERS}/${API_ROUTES.ADDRESSES}`,
    //     method: "GET",
    //     data,
    //   }),
    //   providesTags: ["addresses"],
    // }),
    // UpdateCartAddress: builder.mutation<any, { addressId: number }>({
    //   query: (data) => ({
    //     url: `${API_ROUTES.CART}/${API_ROUTES.ADDRESS}`,
    //     method: "PATCH",
    //     data,
    //   }),
    //   invalidatesTags: ["Cart"],
    // }),
    // addInstructions: builder.mutation<any, { instructions: string | null }>({
    //   query: (data) => ({
    //     url: `${API_ROUTES.CART}/${API_ROUTES.INSTRUCTIONS}`,
    //     method: "PATCH",
    //     data,
    //   }),
    // }),
    // addAddress: builder.mutation<any, any>({
    //   query: (data) => ({
    //     url: `${API_ROUTES.USERS}/${API_ROUTES.ADDRESSES}`,
    //     method: "POST",
    //     data,
    //   }),
    //   invalidatesTags: ["addresses"],
    // }),
    // deleteAddress: builder.mutation<any, { addressId: number }>({
    //   query: ({ addressId }) => ({
    //     url: `${API_ROUTES.USERS}/${API_ROUTES.ADDRESSES}/${addressId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["addresses"],
    // }),
    // editAddress: builder.mutation<any, { reqBody: IAddress | any }>({
    //   query: ({ reqBody }) => ({
    //     url: `${API_ROUTES.USERS}/${API_ROUTES.ADDRESSES}`,
    //     method: "PUT",
    //     data: reqBody,
    //   }),
    //   invalidatesTags: ["addresses"],
    // }),
    // createCheckSession: builder.query<
    //   { data: { orderId: string; amount: number; currency: CurrencyCode } },
    //   void
    // >({
    //   query: () => ({
    //     url: `${API_ROUTES.ORDERS}/${API_ROUTES.CREATE_CHECKOUT_SESSION}`,
    //     method: "GET",
    //   }),
    // }),
    // verifyPaymentSignature: builder.mutation<any, any>({
    //   query: (data) => ({
    //     url: `${API_ROUTES.ORDERS}/${API_ROUTES.VERIFY_PAYMENT}`,
    //     method: "POST",
    //     data,
    //   }),
    //   invalidatesTags: ["CartCount"],
    // }),
  }),
});

export const { useGetCategoriesQuery } = sharedService;
export default sharedService;
