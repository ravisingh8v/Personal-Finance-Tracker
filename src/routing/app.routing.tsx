import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddBook from "../pages/add-book/AddBook";
import Book from "../pages/book/Book";
import Expenses from "../pages/expenses/Expenses";
import { MENU_LINKS } from "../shared/utility/constants/constants";

export const router = createBrowserRouter([
  {
    path: MENU_LINKS.DEFAULT,
    element: <App />,
    children: [
      {
        path: MENU_LINKS.DEFAULT,
        element: <Book />,
      },
      { path: MENU_LINKS.ADD_BOOK, element: <AddBook /> },
      { path: MENU_LINKS.EDIT_BOOK + "/:id", element: <AddBook /> },
      {
        path: MENU_LINKS.BOOK + "/:id" + MENU_LINKS.EXPENSES,
        element: <Expenses />,
      },
      // { path: `${MENU_LINKS.ORDER}/:id`, element: <OrderDetails /> },
      // { path: `${MENU_LINKS.MENUS}`, element: <Menus /> },
      // { path: `${MENU_LINKS.MENU_DETAILS}`, element: <MenuDetails /> },
      // {
      //   path: `${MENU_LINKS.ACCOUNT}`,
      //   element: <Account />,
      // },
      // { path: MENU_LINKS.RESTAURANT_PROFILE, element: "Coming Soon" },
      // { path: MENU_LINKS.PAYMENT_HISTORY, element: <PaymentHistory /> },
      // { path: MENU_LINKS.PAST_ORDERS, element: <PastOrders /> },
      // { path: `${MENU_LINKS.PAST_ORDERS}/:id`, element: <OrderDetails /> },
      // { path: MENU_LINKS.NOTIFICATION, element: "Coming Soon" },
    ],
  },

  { path: MENU_LINKS.SIGN_UP, element: "<SignUp />" },
  { path: MENU_LINKS.VERIFY, element: "<Verify />" },
  // TODO: Create Page Not Found Page and other hero pages ex. 404, 401, 403
  { path: "*", element: <div>Page Not Found</div> },
]);
