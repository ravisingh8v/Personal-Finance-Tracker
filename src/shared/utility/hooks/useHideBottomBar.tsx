import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowBottomBar } from "../slice/app.slice";

const useHideBottomBar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowBottomBar(false));

    return () => {
      dispatch(setShowBottomBar(true));
    };
  }, []);
};

export default useHideBottomBar;
