import { createApi } from "@reduxjs/toolkit/query/react";
import { type AxiosResponse } from "axios";
import { axiosBaseQuery } from "../auth/axiosBaseQuery";
import { API_ROUTES, API_URL, QueryTags } from "../constants/constants";
import type { IBook, IBookReq, IReq } from "../model/model";

const url = API_URL;

export const bookService = createApi({
  reducerPath: "bookService",
  tagTypes: [QueryTags.Book],
  baseQuery: axiosBaseQuery(url),
  endpoints: (builder) => ({
    getBooks: builder.query<AxiosResponse<IBook[]>, void>({
      query: () => ({
        url: `${API_ROUTES.BOOK}`,
        method: "GET",
      }),
      providesTags: [QueryTags.Book],
    }),
    addBook: builder.mutation<AxiosResponse<IBook>, IBookReq>({
      query: (reqBody) => ({
        url: `${API_ROUTES.BOOK}`,
        method: "POST",
        data: reqBody,
      }),
      invalidatesTags: [QueryTags.Book],
    }),
    deleteBook: builder.mutation<AxiosResponse<string>, number>({
      query: (bookId) => ({
        url: `${API_ROUTES.BOOK}/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: [QueryTags.Book],
    }),
    getBookById: builder.query<AxiosResponse<IBook>, number>({
      query: (bookId) => ({
        url: `${API_ROUTES.BOOK}/${bookId}`,
        method: "GET",
      }),
    }),
    updateBook: builder.mutation<
      AxiosResponse<string>,
      IReq<{ bookId: number }, IBookReq>
    >({
      query: ({ params, reqBody }) => ({
        url: `${API_ROUTES.BOOK}/${params.bookId}`,
        method: "PUT",
        data: reqBody,
      }),
      invalidatesTags: [QueryTags.Book],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} = bookService;
