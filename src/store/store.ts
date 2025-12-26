import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { bookService } from "../shared/utility/service/book.service";
import { expenseService } from "../shared/utility/service/expense.service";
import sharedService from "../shared/utility/service/shared.service";
import appSlice from "../shared/utility/slice/app.slice";

export const store = configureStore({
  reducer: {
    appSlice: appSlice,
    [bookService.reducerPath]: bookService.reducer,
    [expenseService.reducerPath]: expenseService.reducer,
    // homeSlice: homeSclie,
    [sharedService.reducerPath]: sharedService.reducer,
    // [home.reducerPath]: home.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      // auth.middleware,
      sharedService.middleware,
      bookService.middleware,
      expenseService.middleware
    );
  },
});
// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware().concat(
//     auth.middleware,
//     sharedService.middleware,
//   ),

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
