import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../slice/app.slice";

const useHideHeader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowHeader(false));

    return () => {
      dispatch(setShowHeader(true));
    };
  }, []);
};

export default useHideHeader;
