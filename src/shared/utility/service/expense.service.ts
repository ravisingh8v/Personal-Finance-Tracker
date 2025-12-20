import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../auth/axiosBaseQuery";
import { API_ROUTES, API_URL, QueryTags } from "../constants/constants";
import type { IExpenseRes } from "../model/model";

const url = API_URL;

export const expenseService = createApi({
  reducerPath: "expenseService",
  tagTypes: [QueryTags.Expense],
  baseQuery: axiosBaseQuery(url),
  endpoints: (builder) => ({
    getExpenses: builder.query<IExpenseRes, number>({
      query: (bookId) => ({
        url: `${API_ROUTES.BOOK}/${bookId}/${API_ROUTES.EXPENSE}`,
        method: "GET",
      }),
      providesTags: [QueryTags.Expense],
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
} = expenseService;
