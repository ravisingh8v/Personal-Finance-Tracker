import { useAuth } from "@clerk/clerk-react";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import axios, { type AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ERROR_MESSAGES } from "../../../core/utility/constants/constants";
import { MENU_LINKS } from "../constants/constants";
import { clearLocalStorage } from "../helper/helper";

export const AuthInterceptor = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  axios.defaults.baseURL = "";

  axios.interceptors.request.use(
    async (req) => {
      const token = await getToken();
      if (token && req.headers) {
        req.headers["Authorization"] = `Bearer ${token}`;
      }
      return req;
    },
    (error: any) => {
      console.log(error, "error");
    }
  );

  const axiosResponseInterceptor = axios.interceptors.response.use(
    (res: AxiosResponse) => {
      return res;
    },
    (error: any) => {
      if (error?.status !== 200) {
        if (error?.response.status === 400 || error?.response.status === 404) {
          // Show toaster notification for other 400 errors
          showNotification({
            title: "Error",
            message: error.response.data.message,
            icon: <IconX />,
            color: "red",
          });
        } else if (error?.response.status === 401) {
          if (
            error.response.data.message === ERROR_MESSAGES.TOKEN_INVALID ||
            error.response.data.message === ERROR_MESSAGES.ACCESS_TOKEN_EXPIRED
          ) {
            clearLocalStorage();
            navigate(MENU_LINKS.SIGN_IN);
            return;
          }

          showNotification({
            title: "Error",
            message: error.response.data.message,
            icon: <IconX />,
            color: "red",
          });
        } else if (error?.response.status === 403) {
          navigate("/access-denied");
        } else {
          showNotification({
            title: "Error",
            message: error?.response.data.error,
            icon: <IconX />,
            color: "red",
          });
        }
      }
      return error;
    }
  );

  useEffect(() => () => {
    axios.interceptors.response.eject(axiosResponseInterceptor);
  });

  return null;
};
