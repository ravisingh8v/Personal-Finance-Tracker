import { useLocation } from "react-router";

const usePathValidation = (path: string, exactMatch?: boolean) => {
  const location = useLocation();
  if (exactMatch) {
    return location.pathname === path;
  } else {
    return location.pathname.startsWith(`${path}`);
  }
};

export default usePathValidation;
