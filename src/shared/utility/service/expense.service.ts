import { createApi } from "@reduxjs/toolkit/query/react";
import type { AxiosResponse } from "axios";
import { axiosBaseQuery } from "../auth/axiosBaseQuery";
import { API_ROUTES, API_URL, QueryTags } from "../constants/constants";
import type { IExpense, IExpenseReq, IExpenseRes, IReq } from "../model/model";

const url = API_URL;

export const expenseService = createApi({
  reducerPath: "expenseService",
  tagTypes: [QueryTags.Expense],
  baseQuery: axiosBaseQuery(url),
  endpoints: (builder) => ({
    getExpenses: builder.query<AxiosResponse<IExpenseRes>, number>({
      query: (bookId) => ({
        url: `${API_ROUTES.BOOK}/${bookId}/${API_ROUTES.EXPENSE}`,
        method: "GET",
      }),
      providesTags: [QueryTags.Expense],
    }),

    getExpenseById: builder.query<
      AxiosResponse<IExpense>,
      { bookId: number; expenseId: number }
    >({
      query: ({ bookId, expenseId }) => ({
        url: `${API_ROUTES.BOOK}/${bookId}/${API_ROUTES.EXPENSE}/${expenseId}`,
        method: "GET",
      }),
      providesTags: [QueryTags.Expense],
    }),

    postExpense: builder.mutation<
      AxiosResponse<IExpense>,
      IReq<{ bookId: number }, IExpenseReq>
    >({
      query: ({ params, reqBody }) => ({
        url: `${API_ROUTES.BOOK}/${params.bookId}/${API_ROUTES.EXPENSE}`,
        method: "POST",
        data: reqBody,
      }),
    }),
    updateExpense: builder.mutation<
      AxiosResponse<IExpense>,
      IReq<{ bookId: number; expenseId: number }, IExpenseReq>
    >({
      query: ({ params, reqBody }) => ({
        url: `${API_ROUTES.BOOK}/${params.bookId}/${API_ROUTES.EXPENSE}/${params.expenseId}`,
        method: "PUT",
        data: reqBody,
      }),
    }),

    // addBook: builder.mutation<IBook, IBookReq>({
    //   query: (reqBody) => ({
    //     url: `${API_ROUTES.BOOK}`,
    //     method: "POST",
    //     data: reqBody,
    //   }),
    //   invalidatesTags: [QueryTags.Book],
    // }),
    // deleteBook: builder.mutation<string, number>({
    //   query: (bookId) => ({
    //     url: `${API_ROUTES.BOOK}/${bookId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [QueryTags.Book],
    // }),
    // getBookById: builder.query<IBook, number>({
    //   query: (bookId) => ({
    //     url: `${API_ROUTES.BOOK}/${bookId}`,
    //     method: "GET",
    //   }),
    // }),
    // updateBook: builder.mutation<string, IReq<{ bookId: number }, IBookReq>>({
    //   query: ({ params, reqBody }) => ({
    //     url: `${API_ROUTES.BOOK}/${params.bookId}`,
    //     method: "PUT",
    //     data: reqBody,
    //   }),
    //   invalidatesTags: [QueryTags.Book],
    // }),
  }),
});

export const {
  // useGetBooksQuery,
  // useAddBookMutation,
  // useDeleteBookMutation,
  // useGetBookByIdQuery,
  // useUpdateBookMutation,
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  usePostExpenseMutation,
  useUpdateExpenseMutation,
} = expenseService;
