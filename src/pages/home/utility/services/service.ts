import { createApi } from "@reduxjs/toolkit/query/react";
import { type AxiosResponse } from "axios";
import { axiosBaseQuery } from "../../../../shared/utility/auth/axiosBaseQuery";
import {
  API_ROUTES,
  API_URL,
} from "../../../../shared/utility/constants/constants";
import { type OrderData } from "../models/models";

const url = API_URL;

export const home = createApi({
  reducerPath: "home",
  baseQuery: axiosBaseQuery(url),
  endpoints: (builder) => ({
    getOrderList: builder.query<AxiosResponse<OrderData>, string>({
      query: (type) => ({
        url: `${API_ROUTES.ORDERS}/${API_ROUTES.RESTAURANT}?type=${type}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOrderListQuery } = home;
