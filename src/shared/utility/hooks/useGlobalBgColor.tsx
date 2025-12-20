import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGlobalBgColor } from "../slice/app.slice";

const useGlobalBgColor = (color: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGlobalBgColor(color));

    return () => {
      dispatch(setGlobalBgColor("white"));
    };
  }, []);
};

export default useGlobalBgColor;
